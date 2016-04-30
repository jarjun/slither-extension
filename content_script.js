var s = document.createElement('script');
s.id = "myCode";
s.type = 'text/javascript';

code = function(){
    
    var adjectives;
    var animals;

    String.prototype.hashCode = function(){
        var hash = 0;
        if (this.length == 0) return hash;
        for (var i = 0; i < this.length; i++) {
            var character = this.charCodeAt(i);
            hash = ((hash<<5)-hash)+character;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
    function getWords(callback){
        $.get("http://jarjun.github.io/slither-extension/adjectives", function(adj) {
            console.log(adj);
            adjectives = adj.split('\n');
            $.get("http://jarjun.github.io/slither-extension/animals", function(anm) {
                animals = anm.split('\n');
                console.log(adjectives);
                callback()
            });
        });
    }

    function pickName(ip, port){
        var first = ip.hashCode() % adjectives.length;
        var second = ip + ":" + port;
        second = second.hashCode() % animals.length;
        return adjectives[first] + " " + animals[second];
    }

    var selectServer = function(serverNumber){
        sos = [sos[serverNumber]];
        console.log(serverNumber);
        console.log(sos);
    }

    var createServerList = function(){    
        var servers = JSON.stringify(sos);
        var stuff = document.createElement("ul");
        console.log(adjectives);
        for (var i = 0; i < sos.length; i++) {
            var listItem = document.createElement("li");
            listItem.innerHTML =  pickName(sos[i].ip, sos[i].po);//sos[i].ip + ":" + sos[i].po;
            listItem.setAttribute('onclick', 'selectServer('+i+')');
            stuff.appendChild(listItem);
        };
        stuff.style = "position: fixed; right: 20px; top: 100px; z-index: 50; height: 500px; overflow: hidden; overflow-y: scroll; font-family: 'Lucida Sans Unicode', 'Lucida Grande', sans-serif; font-size: 12px; color: #FFFFFF;";
        stuff.id = "serverList";
        stuff.src = servers;
        var foregroundContainer = document.getElementById("smh");
        foregroundContainer.appendChild(stuff);
    }

    function loadScript(url, callback) {

        var script = document.createElement("script")
        script.type = "text/javascript";

        if (script.readyState) { //IE
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { //Others
            script.onload = function () {
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    loadScript("https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function () {

         //jQuery loaded
         console.log('jquery loaded');


        getWords(createServerList);

    });
}

try {

    var funcToString = code.toString().split('\n');
    var funcToStringNoHeaders = funcToString.splice(1,funcToString.length - 2).join('\n');
    s.appendChild(document.createTextNode(funcToStringNoHeaders));
    document.body.appendChild(s);
} catch (e) {
    s.text = code;
    document.body.appendChild(s);
}
