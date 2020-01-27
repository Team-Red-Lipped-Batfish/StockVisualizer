fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&datatype=json&outputsize=compact&apikey=Y6A15R1X3FBQ97V4`)
  .then((responseData) => JSON.parse(responseData))
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error)
});