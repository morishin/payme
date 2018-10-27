import * as Functions from "firebase-functions";
import * as Admin from "firebase-admin";
import * as CORS from "cors";
import * as Stripe from "stripe";

Admin.initializeApp(Functions.config().firebase);

const charge = (request: Functions.Request, response: Functions.Response) => {
  const body = JSON.parse(request.body);
  const token = body.token.id;
  const email = body.token.email;
  const amount = body.charge.amount;
  const currency = body.charge.currency;

  // TODO: Remember to set token using >> $firebase functions:config:set stripe.token="SECRET_STRIPE_TOKEN_HERE"
  const stripe = new Stripe(Functions.config().stripe.token);
  stripe.charges
    .create({
      amount,
      currency,
      description: "payme",
      source: token,
      receipt_email: email
    })
    .then(charge => {
      send(response, 200, {
        message: "Success",
        charge
      });
    })
    .catch(error => {
      console.error(error);
      send(response, 500, {
        error: error.message
      });
    });
};

function send(response: Functions.Response, statusCode: number, body: any) {
  response.send({
    statusCode,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(body)
  });
}

exports.charge = Functions.https.onRequest((request, response) => {
  const CORSRequestHandler = CORS({ origin: true });
  CORSRequestHandler(request, response, () => {
    if (request.method !== "POST") {
      send(response, 405, { error: "Invalid Request" });
    }
    try {
      charge(request, response);
    } catch (e) {
      console.log(e);
      send(response, 500, {
        error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`
      });
    }
  });
});
