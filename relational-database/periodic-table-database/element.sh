#! /bin/bash

PSQL="psql --username=freecodecamp --dbname=periodic_table -t --no-align -c"

if [[ -z "$1" ]]
then 
  echo "Please provide an element as an argument."
fi

# input is not number
if [[ ! $1 =~ ^[0-9]+$ ]]
then
  LENGTH=$(expr length "$1")

  # short name case
  if [[ $LENGTH -le 2 && $LENGTH -gt 0 ]]
  then 
    SYMBOL=$1
    LONG_NAME=$($PSQL "select name from elements where symbol = '$SYMBOL'")

    if [[ -z $LONG_NAME ]]
    then 
      echo "I could not find that element in the database."
    else
      ATM_NUM=$($PSQL "select atomic_number from elements where symbol = '$SYMBOL'")
      ATM_MASS=$($PSQL "select atomic_mass from properties where atomic_number = $ATM_NUM")
      TYPE=$($PSQL "select type from properties left join types using (type_id) where atomic_number = $ATM_NUM")
      M_PT=$($PSQL "select melting_point_celsius from properties where atomic_number = $ATM_NUM")
      B_PT=$($PSQL "select boiling_point_celsius from properties where atomic_number = $ATM_NUM")

      echo "The element with atomic number $ATM_NUM is $LONG_NAME ($SYMBOL). It's a $TYPE, with a mass of $ATM_MASS amu. $LONG_NAME has a melting point of $M_PT celsius and a boiling point of $B_PT celsius."
    fi
  fi 

  # long name case
  if [[ $LENGTH -gt 2 ]]
  then 
    LONG_NAME=$1
    SYMBOL=$($PSQL "select symbol from elements where name = '$LONG_NAME'")

    if [[ -z $SYMBOL ]]
    then 
      echo "I could not find that element in the database."
    else
      ATM_NUM=$($PSQL "select atomic_number from elements where symbol = '$SYMBOL'")
      ATM_MASS=$($PSQL "select atomic_mass from properties where atomic_number = $ATM_NUM")
      TYPE=$($PSQL "select type from properties left join types using (type_id) where atomic_number = $ATM_NUM")
      M_PT=$($PSQL "select melting_point_celsius from properties where atomic_number = $ATM_NUM")
      B_PT=$($PSQL "select boiling_point_celsius from properties where atomic_number = $ATM_NUM")

      echo "The element with atomic number $ATM_NUM is $LONG_NAME ($SYMBOL). It's a $TYPE, with a mass of $ATM_MASS amu. $LONG_NAME has a melting point of $M_PT celsius and a boiling point of $B_PT celsius."
    fi
  fi

# if input is number
else 
  ATM_NUM=$1
  SYMBOL=$($PSQL "select symbol from elements where atomic_number = '$ATM_NUM'")

  if [[ -z $SYMBOL ]]
  then 
    echo "I could not find that element in the database."
  else
    LONG_NAME=$($PSQL "select name from elements where symbol = '$SYMBOL'")
    ATM_MASS=$($PSQL "select atomic_mass from properties where atomic_number = $ATM_NUM")
    TYPE=$($PSQL "select type from properties left join types using (type_id) where atomic_number = $ATM_NUM")
    M_PT=$($PSQL "select melting_point_celsius from properties where atomic_number = $ATM_NUM")
    B_PT=$($PSQL "select boiling_point_celsius from properties where atomic_number = $ATM_NUM")

    echo "The element with atomic number $ATM_NUM is $LONG_NAME ($SYMBOL). It's a $TYPE, with a mass of $ATM_MASS amu. $LONG_NAME has a melting point of $M_PT celsius and a boiling point of $B_PT celsius."
  fi
fi 
