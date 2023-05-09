
import { createServer } from "node:http";

const server = createServer(async (req, res) => {

 

  const url = new URL(req.url, 'https://example.com');
  const { searchParams,pathname } = url;
  
  const id = searchParams.get('id') ;
  
  console.log(id);
    res.statusCode = 200
    
    res.setHeader("Content-Type", "application/json")
    const jsonresponse = JSON.stringify({user:"pippo"})
    res.end(jsonresponse)
    
})



server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/")
})