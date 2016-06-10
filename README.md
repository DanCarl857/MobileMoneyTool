# Mobile Money Application for the Mifos Platform

## Front end app

**Prerequisites:**
* NodeJs
* Bower

#### How to run the front end app
* Clone the application: *git clone https://github.com/DanCarl857/Mobile-Application*
* Change into the front end directory: *cd frontend-app*
* Run the following: `npm install` && `bower install`
* Then run: `grunt serve`

## Mobile Money Engine

### API Documentation

**This describes the endpoint documentations for the REST calls for the mobile money engine**
**Take note that this is the default configuration which can be changed**

#### Withdraw Money

> This call is used to initiate a withdrawal from the MFI's account into the client's account

* URL
  > /mm_withdrawal/:clientPhone/:amount
* Method
  > POST
* URL Params
  **Required:**
  > clientPhone=[integer|bigint]
  > amount=[integer|bigint]
* Data Params
  None
* Success Response:
  > **Code**: 200
  > Content: { successMsg: "Withdrawal successfully completed"}
* Error Response:
  > **Code**: 404 NOT FOUND
  > Content: { error: "Withdrawal unsuccessful"}
OR
  > **Code**: 401 UNAUTHORIZED
  > Content: { error: "You are not authorized to make this request" }
* Sample Call:
  
