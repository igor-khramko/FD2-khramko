"use strict";

    function randomDiap(n,m) {
            return Math.floor(Math.random()*(m-n+1))+n;
    }

    function mood(colorsCount) {
        var colors=[ '', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый' ];
        console.log( 'цветов: ' + colorsCount );
        var colorsHash = {};
        for ( var i=1; i<=colorsCount; i++ ) {
            var n=randomDiap(1,7);
            for(var j=0; j<=Infinity; j++){     
                if ( colors[n] in colorsHash ){
                    n = randomDiap(1,7);
                } else break;
            }
            colorsHash[colors[n]]=n;
        }
        return colorsHash;
    }
 console.log(mood(3));