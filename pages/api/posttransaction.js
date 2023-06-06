// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    //update status into orders table after checking the transaction status
    //initiate shipping
    //redirect user to the order confirmation page
    res.status(200).json({body: req.body})
  }
  