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
        console.log(data);
        //do plot stuff here
})
}