export default function(rangeQuantidade, rangeCapacidade, indiceStart = 1, misturarNumeros = true) {
    const caixas = [];

    for (let key in rangeQuantidade) {
        let qtd = parseInt(rangeQuantidade[key]);
        if (!qtd)
            continue


        let capacidade = parseInt(rangeCapacidade[key])
        const capacidadeDiferete = caixas.length && capacidade != caixas[caixas.length - 1].capacidade;
        let boxRemainingSpace = 0;
        let lastBox;
        if (misturarNumeros) {
            if (caixas.length) {
                lastBox = caixas[caixas.length - 1];
                boxRemainingSpace = lastBox.remainingSpace;
            }
        }

        while (qtd >= capacidade) {
            if (lastBox && lastBox.remainingSpace > 0 && !capacidadeDiferete) {
                if (qtd > lastBox.remainingSpace) {
                    lastBox[key] = lastBox.remainingSpace
                    qtd -= lastBox.remainingSpace

                    lastBox.remainingSpace = 0
                } else {
                    lastBox[key] = qtd
                    lastBox.remainingSpace -= qtd
                    qtd = 0
                }
            } else {
                caixas.push({ 
                    id: indiceStart++, 
                    capacidade: capacidade, 
                    [key]: capacidade
                })
                qtd -= capacidade;
            }
        }

        while (qtd > 0) {
            if (lastBox && lastBox.remainingSpace > 0  && !capacidadeDiferete) {
                if (qtd > lastBox.remainingSpace) {
                    lastBox[key] = lastBox.remainingSpace
                    qtd -= lastBox.remainingSpace

                    lastBox.remainingSpace = 0
                } else {
                    lastBox[key] = qtd
                    lastBox.remainingSpace -= qtd
                    qtd = 0
                }
            } else {
                caixas.push({ 
                    id: indiceStart++, 
                    capacidade: capacidade, 
                    [key]: qtd,
                    remainingSpace: capacidade - qtd
                 })
                qtd = 0
            }
        }
    }

    console.log(caixas.filter(x => x.remainingSpace > 0))

    return caixas;
}