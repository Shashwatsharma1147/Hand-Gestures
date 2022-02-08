link = "https://teachablemachine.withgoogle.com/models/sV5s2LEfu/model.json";
prediction = "";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='captured_image' src=" + data_uri + ">";

    });
}

console.log("ml5 version=" + ml5.version);

classifier = ml5.imageClassifier(link, modelLoaded);

function modelLoaded() {
    console.log("model is loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speakdata1 = "The gesture predicted is " + prediction;
    console.log(speakdata1);
    var utterthis = new SpeechSynthesisUtterance(speakdata1);
    console.log("utter this ="+utterthis.text);
    synth.speak(utterthis);
}


function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, get_result);
}

function get_result(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        prediction = results[0].label;
        if(prediction == "Amazing"){
            document.getElementById("result_label").innerHTML = "It is Amazing!";
            document.getElementById("result_gesture").innerHTML = "&#128076";
        }
        else if(prediction == "Thumbs UP"){
            document.getElementById("result_label").innerHTML = "All The Best!";
            document.getElementById("result_gesture").innerHTML = "&#128077;";
        }
        else if(prediction == "Victory"){
            document.getElementById("result_label").innerHTML = "That was a marvelous victory!";
            document.getElementById("result_gesture").innerHTML = "&#9996;";
        }
        speak();

    }
}

