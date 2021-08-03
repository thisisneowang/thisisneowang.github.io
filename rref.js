let rows;
let columns;
let pivot;
let pivotrow = 0;
let pivotcolumn = 0;

function main()
{

    // Get dimensions of matrix
    rows = window.prompt("Enter the number of rows in the matrix: ");
    columns = window.prompt("Enter the number of columns in the matrix: ");

    
    // Initialize matrix
    let m = matrix[rows][columns];

    // Ask user to enter matrix values
    for (let i = 0; i < rows; i++)
    {
        for (let j = 0; j < columns; j++)
        {
            matrix[i][j] = window.prompt("Enter the value for matrix[%i][%i]: ", i + 1, j + 1);
        }
    }
    
    // Initialize pivot variable
    pivot = matrix[0][0];
    
    // Main RREF algorithm
    for (let i = 0; i < rows; i++)
    {
        if (pivot != 0)
        {
            // Scales all values in row of pivot so that the pivot in that row is 1
            for (let j = 0; j < columns; j++)
            {
                matrix[pivotrow][j] = 1 / pivot * matrix[pivotrow][j];
            }
            pivot = matrix[pivotrow][pivotcolumn];
            // Proceeds to eliminate all values in same column as pivot variable
            for (let j = 0; j < rows; j++)
            {
                if (matrix[j][pivotcolumn] != 0 && j != pivotrow)
                {
                    rowadd(matrix, j, pivotrow, -matrix[j][pivotcolumn]);
                }
            }
            // Updates pivot variable to next in main diagonal
            pivotrow++;
            pivotcolumn++;
            // Instantly ends for loop if pivot variable tries to move to diagonal that doesn't exist
            if (pivotrow > rows - 1 || pivotcolumn > columns - 1)
            {
                break;
            }
            pivot = matrix[pivotrow][pivotcolumn];
        }
        else if (pivotincolumn(matrix, pivotcolumn) != -1)
        {
            swap(matrix, pivotincolumn(matrix, pivotcolumn), pivotrow);
            // Redeclares pivot variable after swapping since it is in the same position as the original
            pivot = matrix[pivotrow][pivotcolumn];
            // To soft reset counter after pivot
            i--;
        }
        else if (pivotinrow(matrix) != -1)
        {
            pivot = matrix[pivotrow][pivotcolumn];
        }
        // If could not find pivot in column or in any entry in same row, then 
        // we are either at the last row or everything else below current row is just zeroes
        // So either find the pivot in this row (if possible), but if not then the algorithm is done.
        else if (rowcontainspivot(matrix) != -1)
        {
            i--;
            continue;
        }
        else
        {
            break;
        }
    }
    
    // Display final matrix values
    for (let i = 0; i < rows; i++)
    {
        for (let j = 0; j < columns; j++)
        {
            // Deals with annoying negative zeroes
            if (matrix[i][j] == -0.000000)
            {
                matrix[i][j] = 0.000000;
            }
            console.log("%f ", matrix[i][j]);
        }
        console.log("\n");
    }
}

// Adds a scalar multiple of row2 to row1
function rowadd(matrix, row1, row2, scalar)
{
    for (let i = 0, n = columns; i < columns; i++)
    {
        matrix[row1][i] += scalar * matrix[row2][i];
        // Tolerance for what is considered zero
        if (fabs(matrix[row1][i]) < pow(10, -5)) 
        {
            matrix[row1][i] = 0;
        }
    }
}

// Swaps row1 and row2
function swap(matrix, row1, row2)
{
    for (let i = 0; i < columns; i++)
    {
        let temp = matrix[row1][i];
        matrix[row1][i] = matrix[row2][i];
        matrix[row2][i] = temp; 
    }
}

// Checks if there is another pivot in the column below the pivot variable. If there is, swaps rows with it; else, returns -1.
function pivotincolumn(matrix, column)
{
    for (let a = pivotrow + 1; a < rows; a++)
    {
        if (matrix[a][column] != 0)
        {
            // Returns the row position of the pivot
            return a;
        }
    }
    // Returns -1 if no pivot (i.e non-zero value) could be found in the same column
    return -1;
}

function pivotinrow(matrix)
{
    for (let a = pivotcolumn + 1; a < columns; a++)
    {
        if (pivotincolumn(matrix, a) != -1)
        {
            // Returns column position of the pivot; additionally swaps rows and resets pivot position
            swap(matrix, pivotcolumn, pivotincolumn(matrix, a));
            pivotcolumn = a;
            return a;
        }
    }
    /* 
    Returns -1 if no pivot could be found for any of the other entries in the same row 
    as the pivot (hence implying we are either at the last row or there are all zeros below
     the current row)
    */
    return -1;
}

function rowcontainspivot(matrix)
{
    for (let k = 0; k < columns; k++)
    {
        if (matrix[pivotrow][k] != 0)
        {
            pivotcolumn = k;
            pivot = matrix[pivotrow][k];
            return k;
        }
    }
    return -1;
}