d3.json("/teamlist").then(json =>{
    let teamlist = json.teamlist;
    teamlist.forEach(teamname => {
        d3.select("#team1").append("option").text(teamname).property("value", teamname);
        d3.select("#team2").append("option").text(teamname).property("value", teamname);
    });
    d3.select("#team2").property("value", "Boston Celtics")
})

var team1 = "Atlanta Hawks"
var team2 = "Boston Celtics"
plotdata(team1, team2)

function team1changed(firstteam) {
    team1 = firstteam;
    plotdata(team1,team2)
}

function team2changed(secondteam) {
    team2 = secondteam;
    plotdata(team1,team2);
}

function plotdata(firstteam, secondteam) {
    d3.json("/headtoheadstats/" + firstteam + "/" + secondteam).then(data => {
        console.log(data.data[0]);
        //console.log(data.data[0].away.score);
        //do plot stuff here
        let dates=[]
        let awayteam=[]
        let awayteamscore=[]
        let hometeam=[]
        let hometeamscore=[]

        for(let i=0; i<data.data.length; i++)
            {
                //get data for each game played for both teams
                row=data.data[i];
                dates.push(row.date);
                awayteam.push(row.away.team);
                awayteamscore.push(row.away.score);
                hometeam.push(row.home.team);
                hometeamscore.push(row.home.score);
                //print all of game data for both teams
                console.log(data.data[i])
            };
        //trace1 for away team
        let awayteamtrace= {
            x:dates,
            y:awayteamscore,
            text: awayteam,
            name: "Away Results",
            type: "bar"

        }; 

        //trace2 for home team
        let hometeamtrace={
            x:dates,
            y:hometeamscore,
            text: hometeam,
            name: "Home Results",
            type: "bar"


        };

        //create data array
        let barChart = [awayteamtrace, hometeamtrace];

        let layout={
            title: "Head to Head Results for 2020-2021 Season"
        };

        Plotly.newPlot("bar", barChart, layout);
    
        //console.log(awayteamtrace);
     

        //let resultData=data.data[0].date;
        //console.log(resultData);

       // let gamedate=resultData.date;
        //console.log(gamedate);
        /*
        let yticks= ;
        let xValues=;
        let textLabels = ;


        let barChart = {
            y: yticks,
            x: xValues,
            text: textLabels,
            type: "bar"
        }
        let layout ={
            title: "Team Head to Head Stats",
            xaxis: {title: "<b>Year</b>"},
            yaxis: {title: "<b>Points</b>"}
        };

        Plotly.newPlot("bar", [barChart], layout);
*/
      
});


};