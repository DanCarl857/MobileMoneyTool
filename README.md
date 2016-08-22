# Mobile Money Application for the Mifos Platform

## Work done
* Implemented complete interface for Mobile money interaction with the mifos platform
* Successfully integrated MTN mobile money

## Work left:
* Finish generic functionality(currently working on this
* Add support for SOAP APIs
* Add unit tests

## Prerequisites:
* NodeJs
* Bower
* Java 1.8 and above
* MySQL 5.6 and above
* Gradle 2.x(3 is not recommended as it has a bug when getting dependencies)

## Mobile money engine

#### How to run the engine
* Clone the application: *git clone https://github.com/DanCarl857/Mobile-Application*
* cd into the mobile-money-engine directory: `cd mobile-money-directory`
* cd into MM-engine: `cd MM-engine`
* Run $ gradle bootRun
* The above command downloads all the dependencies needed for the project and starts the engine.
* You can now login to the front end app on the browser using the password you use for the Mifos platform. 
* Default creds: *Username*: mifos *Password*: password

## Note: Application will only work when database has been setup.

## Setting up the database
* cd into the MobileMoneyTool directory: `cd MobileMoneyTool`
* cd into the mobile-money-engine directory: `cd mobile-money-directory`
* cd into the database directory: `cd database`
* import the .sql file into your database: *$ mysql -uroot -p < mobile_money_application.sql* 
* Enter your password and that's it.

## Front end app

#### How to run the front end app
* Clone the application: *git clone https://github.com/DanCarl857/Mobile-Application*
* Change into the front end directory: *cd frontend-app*
* Run the following: `npm install` && `bower install`
* Then run: `grunt serve`

## Note: Configuring the application to use your API can be found: *https://mifosforge.jira.com/wiki/display/docs/Mobile+Money+Tool*

## Mobile Money Engine

### API Documentation

*NB: Take note that this is the default configuration which can be changed*

#### Withdraw Money

> This call is used to initiate a withdrawal from the MFI's account into the client's account

* **URL**: `/api/v1/withdrawals/:clientPhone/:amount/:accountId/:clientId`

* **Method**: *GET*

* **URL Params**:
  * **Required:**
  * clientPhone=[integer]
  * amount=[integer]
  * clientId=[integer]
  * accountId=[integer]
 
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
* Sample Call: `/api/v1/withdrawals?phone=674356789&amount=5000&clientId=2345&account=12345`
  

#### Save Money

> This call is used to initiate a savings deposit into a client's MFI account from their Mobile Money account

* **URL**: `/api/v1/savings/:clientPhone/:amount/:accountId/:clientId`

* **Method**: *GET*

* **URL Params**:
  * **Required:**
  * clientPhone=[integer]
  * amount=[integer]
  * clientId=[integer]
  * accountId=[integer]
 
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
  
* Sample Call: `/api/v1/withdrawals?phone=674356789&amount=5000&clientId=2345&account=12345`
  

#### Send Money

> This call is used to initiate a money transfer transaction from the client's MFI account to the Recipient's Mobile Money account

* **URL**: `/api/v1/mm_savings/:clientPhone/:recipientPhone/:amount/:accountId/:clientId`

* **Method**: *GET*

* **URL Params**:
  * **Required:**
  * clientPhone=[integer]
  * recipientPhone=[integer]
  * amount=[integer]
  * clientId=[integer]
  * accountId=[integer]
 
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

* **URL**: `/api/v1/transaction/:id`

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
  
* Sample Call: `/transaction/2`

#### Configurations

> This call is used to set the configurations needed for the API to be used with the application

* **URL**: `/api/v1/configurations`

* **Method**: *GET*

* **URL Params**:
  * **Required:**
  * id=[integer]
 
* **Data Params**: 
    { }
      
* **Success Response**:
  * **Code**: 200
  * **Content**: { successMsg: "Configurations successfully set"}
  
* **Error Response**:
  * **Code**: 404 NOT FOUND
  * **Content**: { error: "Failure to set configurations"}
  
OR

  * **Code**: 401 UNAUTHORIZED
  * **Content**: { error: "You are not authorized to make this request" }
  
* Sample Call: `/api/v1/configurations`
  
