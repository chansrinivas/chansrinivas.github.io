let locations = [];
let avg_magnitude = [];
let canvas;


function preload() {
    data = loadTable(
        'https://gist.githubusercontent.com/chansrinivas/8f6fc8b49d6fd813126c3b78aab43fe7/raw/4f38400fd7834b48e89495f4f7f3874099071074/barchart-dotplot.csv',
        'csv',
        'header',
    );
}

function setup() {
    let magnitude = [];
    let placeslist = [];
    canvas = createCanvas(700, 450).parent('black-container');
    totalRows = data.getRowCount();
    places = data.getColumn('location name');
    for (let i = 0; i < places.length; i++) {
        placeslist.push(places[i]);
        unique = [...new Set(placeslist)];
    }
    sort(unique);

    for (var i = 0; i < unique.length; i++) {
        let total = 0;
        let occurrences = 0;
        let mag = 0;
        for (var j = 0; j < totalRows; j++) {
            if (data.getString(j, 0) == unique[i]) {
                total = total + data.getNum(j, 1);
                occurrences = occurrences + 1;
            }
        }
        mag = total / occurrences;
        magnitude.push(mag);
    }

    for (var k = 0; k < magnitude.length; k++) {
        if (magnitude[k] > 4.0) {
            avg_magnitude.push(round(magnitude[k], 2));
            locations.push(unique[k]);
        }
    }
}

function draw() {
    background(255, 255, 255);
    fill(0);
    strokeWeight(0.5);
    line(91, 0, 91, 335);
    line(60, 290, 490, 290);

    for (var i = 0; i < locations.length; i++) {
        if (avg_magnitude[i] > 4.8) {
            stroke(0, 0, 0);
            strokeWeight(9);
            point(
                avg_magnitude[i] * 45 -
                375 -
                (3 - avg_magnitude[i]) * 300,
                18.5 + 22 * i,
            );
            stroke(0);
        } else {
            stroke(153, 204, 255);
            strokeWeight(12);
            point(
                avg_magnitude[i] * 45 -
                375 -
                (3 - avg_magnitude[i]) * 300,
                18.5 + 22 * i,
            );
        }
    }
    stroke(0, 0, 0);
    for (var xticks = 4; xticks <= 5.0; xticks += 0.1) {
        strokeWeight(0.5);
        line(
            xticks * 45 - 380 - (2.98 - xticks) * 300,
            290,
            xticks * 45 - 380 - (2.98 - xticks) * 300,
            299,
        );
        textSize(11);
        strokeWeight(0);
        text(
            round(xticks, 1),
            xticks * 45 - 385 - (2.98 - xticks) * 300,
            315,
        );
        strokeWeight(0);
    }

    for (var i = 0; i < locations.length; i++) {
        if (locations[i] == 'Japan') {
            textSize(10);
            text('Highest magnitude', 370, 24 + 20 * i);
        }
        strokeWeight(0.5);
        stroke(224, 224, 224);
        line(91, 18.4 + 22 * i, 465, 18.4 + 22 * i);
        stroke(0);
        strokeWeight(0.5);
        textSize(12);
        text(locations[i], 10, 20.5 + 22.2 * i);
        text(avg_magnitude[i], 475, 20.5 + 22.2 * i);
    }
    text('Average Magnitude', 250, 340);
    textSize(13);
    text('Average Impact Magnitude of Earthquakes', 180, 390);
    text('In Different Places', 260, 410);
}
