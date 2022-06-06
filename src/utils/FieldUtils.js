/*
* This function is heavily inspired by GitHub user https://github.com/bazhanius
* He did a great job implementing these utility functions.
* They are used under the MIT license.
*/

const fieldUtils = {
    // Generate array of objects with given rows, columns and bombs
    generateField: function (cols, rows, bombs) {
        let field = [];
        let arrOfBombs = Array(bombs).fill(1)
            .concat(Array(cols * rows - bombs).fill(0))
            .sort(() => Math.random() - 0.5); // Randomize bomb location

        arrOfBombs.forEach((el, i) => {
            field.push({
                'cellID': i,
                'isOpened': false,
                'containBomb': !!el,
                'bombsAround': 0,
                'isFlagged': false,
                'rowNum': Math.floor(i / cols) + 1,
                'colNum': Math.floor(i % cols) + 1
            });
        });

        field.forEach(el => {
            el.bombsAround = field.filter(a =>
                a.rowNum >= el.rowNum - 1 && a.rowNum <= el.rowNum + 1
                && a.colNum >= el.colNum - 1 && a.colNum <= el.colNum + 1
                && a.containBomb === true
            ).length;
        });

        return field;
    },

    checkWin: function (field) {
        let allCells = field.length;
        let countBombsFlagged = field.filter(a => a.containBomb && a.isFlagged).length;
        let countOpened = field.filter(a => a.isOpened).length;
        return (allCells === countBombsFlagged + countOpened);
    },

    findEmptyCellsAroundCell: function (field) {
        let processedField = field;
        let potentialCellsToProcess = 0;
        let actualCellsProcessed = 0;

        do {
            let emptyAndOpenedCells = processedField.filter(a =>
                a.containBomb === false
                && a.bombsAround === 0
                && a.isOpened === true
            );

            potentialCellsToProcess = emptyAndOpenedCells.length;

            if (potentialCellsToProcess === 0) {
                break;
            }

            emptyAndOpenedCells.forEach(el => {
                let cellsAround = processedField.filter(a =>
                    a.rowNum >= el.rowNum - 1 && a.rowNum <= el.rowNum + 1
                    && a.colNum >= el.colNum - 1 && a.colNum <= el.colNum + 1
                );
                cellsAround.forEach(el => {
                    processedField[el.cellID].isOpened = true;
                });
            });

            emptyAndOpenedCells = processedField.filter(a =>
                a.containBomb === false
                && a.bombsAround === 0
                && a.isOpened === true
            );

            actualCellsProcessed = emptyAndOpenedCells.length;
        } while (potentialCellsToProcess !== actualCellsProcessed)

        return processedField;
    }
}

export default fieldUtils;
