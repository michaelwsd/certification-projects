#! /bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.
echo $($PSQL "truncate games, teams")
cat games.csv | while IFS="," read YEAR ROUND WINNER OPPONENT WINNER_GOALS OPPONENT_GOALS
do
  # insert winners
  if [[ $WINNER != winner ]]
  then
    WINNER_ID=$($PSQL "select team_id from teams where name = '$WINNER'")
    if [[ -z $WINNER_ID ]]
    then 
      # insert winner team 
      INSERT_WINNER_RESULT=$($PSQL "insert into teams (name) values ('$WINNER')")
      if [[ $INSERT_WINNER_RESULT == "INSERT 0 1" ]]
      then
        echo "Inserted into teams, $WINNER"
      fi
      WINNER_ID=$($PSQL "select team_id from teams where name = '$WINNER'")
    fi 
  fi

  # insert opponents
  if [[ $OPPONENT != opponent ]]
  then 
    OPPONENT_ID=$($PSQL "select team_id from teams where name = '$OPPONENT'")
    if [[ -z $OPPONENT_ID ]]
    then 
      # insert winner team 
      INSERT_OPPONENT_RESULT=$($PSQL "insert into teams (name) values ('$OPPONENT')")
      if [[ $INSERT_OPPONENT_RESULT == "INSERT 0 1" ]]
      then
        echo "Inserted into teams, $OPPONENT"
      fi
      OPPONENT_ID=$($PSQL "select team_id from teams where name = '$OPPONENT'")
    fi 
  fi

  # insert game stats 
  if [[ $YEAR != year ]]
  then 
    INSERT_STAT_RESULT=$($PSQL "insert into games (year, round, winner_id, opponent_id, winner_goals, opponent_goals) values ($YEAR, '$ROUND', $WINNER_ID, $OPPONENT_ID, $WINNER_GOALS, $OPPONENT_GOALS)")
    if [[ $INSERT_STAT_RESULT == "INSERT 0 1" ]]
    then
      echo "Inserted into games, $WINNER vs $OPPONENT"
    fi
  fi

done