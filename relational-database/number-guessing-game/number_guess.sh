#! /bin/bash

PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"
echo -e "\n~~ Welcome to Number Guessing Game ~~\n"
echo "Enter your username:"
read USERNAME

ROUNDS=$($PSQL "select rounds_played from users where name = '$USERNAME'")
echo $ROUNDS
if [[ -z $ROUNDS ]]
then
  # create new user
  INSERT_USER=$($PSQL "insert into users (name) values ('$USERNAME')")
  echo -e "\nWelcome, $USERNAME! It looks like this is your first time here."
else
  SCORE=$($PSQL "select best_score from users where name = '$USERNAME'")
  echo -e "\nWelcome back, $USERNAME! You have played $ROUNDS games, and your best game took $SCORE guesses."
fi

NUMBER_GUESS=$(($RANDOM % 1000))
echo $NUMBER_GUESS

echo -e "\nGuess the secret number between 1 and 1000:"
read GUESS
NUM_TRY=0

while [[ $GUESS != $NUMBER_GUESS ]]
do
  if [[ ! $GUESS =~ ^[0-9]+$ ]]
  then 
    echo "That is not an integer, guess again:"
  elif [[ $GUESS -lt $NUMBER_GUESS ]]
  then 
    echo "It's higher than that, guess again:"
  else
    echo "It's lower than that, guess again:"
  fi

  NUM_TRY=$(($NUM_TRY + 1))
  read GUESS
done 

NUM_TRY=$(($NUM_TRY + 1))
echo -e "\nYou guessed it in $NUM_TRY tries. The secret number was $NUMBER_GUESS. Nice job!"
UPDATE_ROUND_RES=$($PSQL "update users set rounds_played = rounds_played + 1 where name = '$USERNAME'")
UPDATE_SCORE_RES=$($PSQL "update users set best_score = case when best_score is not null then least(best_score, $NUM_TRY) else $NUM_TRY end where name = '$USERNAME'")