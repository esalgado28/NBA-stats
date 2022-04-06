
d3.json("http://localhost:5000/allstandings").then(json => {
    select = d3.select("#selDataset");
    for (object in json) {
        select.append("option").text(json[object].season).property("value", json[object].season);
    } 
});

function optionChanged(season) {
    d3.json("http://localhost:5000/standings/" + season).then(json => {
    console.log(json);
})
}