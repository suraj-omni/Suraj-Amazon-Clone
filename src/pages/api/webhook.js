import { buffer } from "micro";
import * as admin from "firebase-admin";
import { session } from "next-auth/client";

//Connection to Firebase
const serviceAccount = require("../../../fbpermissions.json");

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

// Connection to Stripe

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  //console.log('Fullfilling the order', session);
  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`Success: Order ${session.id} had been added to the DB`);
    });
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;
    //Make sure event triggered at stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log("ERROR", err.messege);
      return res.status(400).send(`Webhook error: ${err.messege}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      //Fullfill the order
      return fulfillOrder(session)
        .then(() => {
          res.status(200);
        })
        .catch((err) => {
          res.status(400).send(`Webhook Error: ${err.messege}`);
        });
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
