from fastapi import APIRouter, HTTPException
from models.schema import TextRequest,MainRequest
from services.qachain import process_req

router = APIRouter()

chain_obj=[]

flag=False

@router.post("/process_chain")
async def process(data:MainRequest):
    global flag, chain_obj
    print("Calling")
    if not flag:
        try:
                chain = process_req(data.urlList)
                if chain is None:
                    raise HTTPException(status_code=404, detail="No valid documents found.")
                chain_obj.append(chain)
                flag=True
                return {"msg":"Success"}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    else:
        return {"msg":"Executed"}
@router.post("/qa")
async def qa(data: TextRequest):
    try:
        chain = chain_obj[0]
        if chain is None:
            raise HTTPException(status_code=404, detail="No valid documents found.")
        result = chain.invoke({"question": data.text})
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))