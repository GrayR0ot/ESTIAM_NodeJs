// avec une boucle for of afficher chaque nombre en tableau
// plusieur solution possible meme si process.stdout.write(str); rajoute true a la fin d'un affichage
//42      4       8
//9       1       10      true
var nombres = [42, 4, 8, 9, 1,10];
var str;
for(var [num, index] of nombres.entries()) {
    if(index % 3 === 0) {
        str += '\n';
    }
    str += num+'\t';
}
process.stdout.write(str);