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

*NB: Take note that this is the default configuration which can be changed*

#### Withdraw Money

> This call is used to initiate a withdrawal from the MFI's account into the client's account

* **URL**: `/mm_withdrawal/:clientPhone/:amount`

* **Method**: *POST*

* **URL Params**:
  * **Required:**
  * clientPhone=[integer|bigint]
  * amount=[integer|bigint]
 
* **Data Params**: *None*
* **Success Response**:
  * **Code**: 200
  * **Content**: { successMsg: "Withdrawal successfully completed"}
  
* **Error Response**:
  * **Code**: 404 NOT FOUND
  * **Content**: { error: "Withdrawal unsuccessful"}
  
OR

  * **Code**: 401 UNAUTHORIZED
  * **Content**: { error: "You are not authorized to make this request" }
* Sample Call:
  

#### Save Money

> This call is used to initiate a savings deposit into a client's MFI account from their Mobile Money account

* **URL**: `/mm_savings/:clientPhone/:amount`

* **Method**: *POST*

* **URL Params**:
  * **Required:**
  * clientPhone=[integer|bigint]
  * amount=[integer|bigint]
 
* **Data Params**: *None*
* **Success Response**:
  * **Code**: 200
  * **Content**: { successMsg: "Saving successfully completed"}
  
* **Error Response**:
  * **Code**: 404 NOT FOUND
  * **Content**: { error: "Saving unsuccessful"}
  
OR

  * **Code**: 401 UNAUTHORIZED
  * **Content**: { error: "You are not authorized to make this request" }
  
* Sample Call:
  

#### Send Money

> This call is used to initiate a money transfer transaction from the client's MFI account to the Recipient's Mobile Money account

* **URL**: `/mm_savings/:clientPhone/:recipientPhone/:amount`

* **Method**: *POST*

* **URL Params**:
  * **Required:**
  * clientPhone=[integer|bigint]
  * recipientPhone=[integer|bigint]
  * amount=[integer|bigint]
 
* **Data Params**: *None*
* **Success Response**:
  * **Code**: 200
  * **Content**: { successMsg: "Money transfered successfully completed"}
  
* **Error Response**:
  * **Code**: 404 NOT FOUND
  * **Content**: { error: "Money transfer unsuccessful"}
  
OR

  * **Code**: 401 UNAUTHORIZED
  * **Content**: { error: "You are not authorized to make this request" }
  
* Sample Call:
  

#### View transactions

> This call is used to view the transaction history for a particular client

* **URL**: `/transactionHist/:id`

* **Method**: *GET*

* **URL Params**:
  * **Required:**
  * id=[integer]
 
* **Data Params**: 
    {
      "id": 1,
      "staff": "Marcus Brody",
      "office": "Head Office",
      "transaction_type": "Withdrawal",
      "amount": 50000,
      "recipient": NULL,
      "date": "5th June 2016"
    }
      
* **Success Response**:
  * **Code**: 200
  * **Content**: { successMsg: "Transaction history view successful"}
  
* **Error Response**:
  * **Code**: 404 NOT FOUND
  * **Content**: { error: "Transaction history unsuccessful"}
  
OR

  * **Code**: 401 UNAUTHORIZED
  * **Content**: { error: "You are not authorized to make this request" }
  
* Sample Call: `/transactionHist/2`
  
