#! /bin/bash

PSQL="psql -X --username=freecodecamp --dbname=salon --tuples-only -c"
echo -e "\n~~~~~ MY SALON ~~~~~\n"
echo -e "Welcome to My Salon, how can I help you?\n"

GET_SERVICES() {
  if [[ $1 ]]
  then 
    echo -e "\n$1"
  fi

  LIST_SERVICES=$($PSQL "select service_id, name from services")
  echo "$LIST_SERVICES" | while read SERVICE_ID BAR SERVICE
  do
    echo "$SERVICE_ID) $SERVICE"
  done

  read SERVICE_ID_SELECTED
  case $SERVICE_ID_SELECTED in 
    [1-3]) BOOK ;;
    *) GET_SERVICES "Please select a valid service." ;; 
  esac
}

BOOK() {
  echo -e "\nWhat is your phone number?"
  read CUSTOMER_PHONE
  
  NAME=$($PSQL "select name from customers where phone = '$CUSTOMER_PHONE'")
  CUSTOMER_NAME=$(echo $NAME | sed 's/ //g')
  if [[ -z $NAME ]]
  then
    echo -e "\nI don't have a record for that phone number, what's your name?"
    read NAME
    CUSTOMER_NAME=$(echo $NAME | sed 's/ //g')
    SAVED_TO_TABLE_CUSTOMERS=$($PSQL "insert into customers (name, phone) values ('$CUSTOMER_NAME','$CUSTOMER_PHONE')")
  fi

  GET_SERVICE_NAME=$($PSQL "select name from services where service_id = $SERVICE_ID_SELECTED")
  SERVICE_NAME=$(echo "$GET_SERVICE_NAME" | sed 's/ //g')
  CUSTOMER_ID=$($PSQL "select customer_id from customers where phone = '$CUSTOMER_PHONE'")
  
  echo -e "\nWhat time would you like your $SERVICE_NAME, $CUSTOMER_NAME?"
  read SERVICE_TIME
  SAVED_TO_TABLE_APPOINTMENTS=$($PSQL "insert into appointments (customer_id, service_id, time) values ($CUSTOMER_ID, $SERVICE_ID_SELECTED, '$SERVICE_TIME')")
  if [[ $SAVED_TO_TABLE_APPOINTMENTS == "INSERT 0 1" ]]
  then
    echo -e "\nI have put you down for a $SERVICE_NAME at $SERVICE_TIME, $CUSTOMER_NAME."
  fi
}

GET_SERVICES