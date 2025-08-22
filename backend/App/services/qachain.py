from bs4 import BeautifulSoup
from langchain.chains import RetrievalQAWithSourcesChain
from langchain.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import UnstructuredURLLoader
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.schema import Document
import os
from core.config import google_key
import requests

os.environ["GOOGLE_API_KEY"]=google_key

embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash")

spliting=RecursiveCharacterTextSplitter(
     separators=['\n\n','\n','.']
    ,chunk_size=200
)

def fallback_scrape(url):
    try:
        headers = {"User-Agent": "Mozilla/5.0"}
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, "html.parser")
        text = soup.get_text(separator="\n", strip=True)
        return text  
    except Exception as e:
        print(f"Fallback scraping failed: {e}")
        return None

def get_url_document(url):
    try:
        loader = UnstructuredURLLoader(urls=[url])
        docs = loader.load()
        if docs and len(docs[0].page_content.strip()) > 500:  
            print("✅ Loaded via UnstructuredURLLoader")
            return docs[0]
        else:
            raise Exception("Empty or useless doc from loader")

    except:
        print("⚠️ Falling back to BeautifulSoup method")
        text = fallback_scrape(url)
        if text:
            return Document(page_content=text, metadata={"source": url})
        else:
            return None

def process_req(urlList:list):
    doc =[]
    for url in urlList:
        d = get_url_document(url)
        if d is not None:
            doc.append(d)

    if doc:
        all_chunks = []
        for d in doc:
            chunks = spliting.split_documents([d]) 
            all_chunks.extend(chunks)
        vectors = FAISS.from_documents(all_chunks, embeddings)
        chain = RetrievalQAWithSourcesChain.from_llm(llm=llm, retriever=vectors.as_retriever())
        return chain
    else:
        return None