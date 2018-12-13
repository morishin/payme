# Payme
Example web application to receive money built with Stripe + Firebase

(inspired by [gordonnl/firebase-stripe](https://github.com/gordonnl/firebase-stripe))

<img src="https://user-images.githubusercontent.com/1413408/47605351-3ebaed00-da40-11e8-8ab1-68f4351ce5f2.png" />

## Features
You can create your link and start receiving any amount of money spacified as URL.

`https://<your-firebase-project-id>.firebaseapp.com/<ammount>`

<img src="https://user-images.githubusercontent.com/1413408/47605421-44650280-da41-11e8-95b7-d9b7f9377ada.png" width="480"/>

<img width="480" alt="2018-10-27 23 41 25" src="https://user-images.githubusercontent.com/1413408/47605478-d4a34780-da41-11e8-8831-ecda8fc509e6.png">

## Deploy and test payment

1. Create a Firebase Project using the [Firebase Developer Console](https://console.firebase.google.com)
1. Enable billing on your project by switching to the **Blaze** (or Flame) plan. See [pricing](https://firebase.google.com/pricing/) for more details. This is required to be able to do requests to non-Google services.
1. Install [Firebase CLI Tools](https://github.com/firebase/firebase-tools) if you have not already and log in with `firebase login`.
1. Configure this sample to use your project using `firebase use --add` and select your project.
1. Install dependencies locally by running: `cd functions; npm install; cd -`
1. [Add your Stripe API Secret Key](https://dashboard.stripe.com/account/apikeys) to firebase config:
```bash
firebase functions:config:set stripe.token=<YOUR STRIPE SECRET KEY>
```
1. Pass your [Stripe publishable key](https://dashboard.stripe.com/account/apikeys) to the `STRIPE_PUBLIC_KEY` variable in `public/index.html` (like `pk_test_*****************`)
1. Deploy your function using `firebase deploy --only functions`
1. Pass your new [Firebase Function URL](https://firebase.google.com/docs/functions/http-events) to the `CHARGE_CLOUD_FUNCTION_TRIGGER_URL` variable in `public/index.html` (like `https://us-central1-***.cloudfunctions.net/charge`)
1. Deploy your hosting using `firebase deploy --only hosting`
1. Test your Stripe integration by viewing your deployed site `firebase open hosting:site`
