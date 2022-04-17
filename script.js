function makeChart(players) {
  // players is an array of objects where each object is something like:
  // {
  //   "Name": "Steffi Graf",
  //   "Weeks": "377",
  //   "Gender": "Female"
  // }

  var playerLabels = players.map(function(d) {
    return d.name;
  });
  var weeksData = players.map(function(d) {
    return +d.preg_count/d.et_count * 100;
  });

  var chart = new Chart('chart', {
    type: "horizontalBar",
    options: {
      maintainAspectRatio: false,
      legend: {
        display: true
      }
    },
    data: {
      labels: playerLabels,
      datasets: [
        {
          data: weeksData,
          label: "移植あたり妊娠率(%)　※妊娠数/移植総回数 * 100で独自に計算",
          backgroundColor: '#19A0AA'
        }
      ]
    }
  });
}

function makeSecondChart(players) {
  var clinicNames = players.map(function(d) {
    return d.name;
  });
  var etCount = players.map(function(d) {
    return d.et_count;
  });
  var pregCount = players.map(function(d) {
    return d.preg_count;
  });
  var birthCount = players.map(function(d) {
    return d.birth_count;
  });
  var chart = new Chart('chart2', {
    type: "bar",
    options: {
      maintainAspectRatio: false,
      legend: {
        display: true
      }
    },
    data: {
      labels: clinicNames,
      datasets: [
        {
          data: etCount,
          label: "移植総回数(回)",
          backgroundColor: '#ff6384'
        },
        {
          data: pregCount,
          label: "妊娠数(回)",
          backgroundColor: '#36a2eb'
        },
        {
          data: birthCount,
          label: "生産分娩数(回)",
          backgroundColor: '#cc65fe'
        }
      ]
    }
  });
}

// Request data using D3
d3
  .dsv("\t", "https://raw.githubusercontent.com/sunmoonStern/funin-open-data/main/hospital-data.tsv")
  .then(makeChart);

d3
  .dsv("\t", "https://raw.githubusercontent.com/sunmoonStern/funin-open-data/main/hospital-data.tsv")
  .then(makeSecondChart);
