let mazo = [];
const palo = ['Corazones', 'Diamantes', 'Treboles', 'Picas'];
const valores = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

for (let paloID = 0; paloID < palo.length; paloID++){
    for (let valoresID = 0; valoresID < valores.length; valoresID++){
        mazo.push(valores[valoresID]) + "de" + palo[paloID];
    }
}

function mezcla(){
    for (let i = mazo.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
    }
}

function reparto(){
    return mazo.pop();
}

function calculoValor(mano) {
    let valor = 0;
    asCont = 0;

    for (let i = 0; i < mano.length; i++){
        const valorCarta = mano[i].split(' ')[0];
        if (valorCarta === 'J' || valorCarta === 'Q' || valorCarta === 'K'){
            valor += 10;
        } else if (valorCarta === 'A'){
            asCont++;
            valor += 11;
        } else {
            valor += parseInt(valorCarta);
        }
    }
    while (valor > 21 && asCont > 0){
        valor -= 10;
        asCont--;
    }
    return valor;
}

mezcla();

function inicio(){
    manoJugador = [reparto(), reparto()];
    manoRepartidor = [reparto(), reparto()];
    puntajeJugador = calculoValor(manoJugador);
    puntajeRepartidor = calculoValor(manoRepartidor);
    gameOver = false;
    
    console.log('Mano del Jugador: ', manoJugador);
    console.log('Mano del Repartidor: ', manoRepartidor);
    console.log('Valor de mano del Jugador: ', puntajeJugador);
    console.log('Valor de mano del Repartidor: ', puntajeRepartidor);

    chequeo();
}

function chequeo(){
    if (puntajeJugador === 21){
        console.log('Tenes Blackjack!!!');
        gameOver = true;
    } else if (puntajeRepartidor === 21){
        console.log('El repartidor tiene Blackjack, perdiste');
        gameOver = true;
    }
}

function jugador(){
    while (!gameOver){
        const decision = prompt('Queres pedir otra carta? (SI/NO)').toLowerCase();
        if (decision == 'SI'){
            manoJugador.push(dealCard());
            puntajeJugador = calculoValor(manoJugador);
            console.log('Mano del Jugador:', manoJugador);
            console,log('Puntaje:', puntajeJugador);
            if (puntajeJugador > 21) {
                console.log('Te pasaste los 21. Perdiste');
                gameOver = true;
            } else {
                break;
            }
        }
    }
    if (!gameOver) {
        repartidor();
    }
}

function repartidor() {
    while (puntajeRepartidor < 17) {
        manoRepartidor.push(reparto());
        puntajeRepartidor = calculoValor(manoRepartidor);
        console.log('Mano del repartidor:', manoRepartidor);
        console.log('Puntaje:', puntajeRepartidor);
    }

    if (puntajeRepartidor > 21 || puntajeRepartidor < puntajeJugador){
        console.log('Felicidades! Ganaste!');
    } else if (puntajeRepartidor > puntajeJugador) {
        console.log('El repartidor gano.');
    } else {
        console.log('Empate!');
    }
    gameOver = true;
}

inicio();
inicio.addEventListener("click", jugador());
