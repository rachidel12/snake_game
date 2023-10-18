$('document').ready(function(){

    var canvas = $('#canvas')[0];
    var ctx = canvas.getContext('2d');
    var snake=[
        {x:50, y:100, oldX:0, oldY:0},
        {x:50, y:90, oldX:0, oldY:0},
        {x:50, y:80, oldX:0, oldY:0},
    ];
    var snakeWidth = snakeHeight = 10;
    var blockSize=10;
    var food={x:200, y:200, eaten:false};
    
    const LEFT= 37;
    const UP= 38;
    const RIGHT= 39;
    const DOWN= 40;
    var keyPressed = DOWN;
    var score = 0; 
    var game;


    function drawSnake(){
        $.each(snake, function(index, value){
            ctx.fillStyle = 'red';
            ctx.fillRect(value.x, value.y, snakeWidth, snakeHeight);
            if(index ==0){
                if(collide(value.x, value.y)){
                    gameOver();
                }
                if(didEatFood(value.x, value.y)){
                    score += 1;
                    $('#score').text(score);
                    makeSnakeBigger();
                    food.eaten= true;
                };
            }
            
        })
    }
    function didEatFood(x,y){
        return food.x == x & food.y ==y;
    }

    function makeSnakeBigger(){
        snake.push({
            x: snake[snake.length - 1].oldX,
            y: snake[snake.length - 1].oldY
        });
    }

    function collide(x,y){
        return snake.filter(function(value, index){
            return index != 0 && value.x == x && value.y ==y;
        }).length>0 || x<0 || x> canvas.width || y<0 || y > canvas.height;
    }


    function clearCanvas(){
        ctx.clearRect(0, 0, canvas.width, canvas.height) ;
    }

    drawSnake();

    function gameloop(){
        clearCanvas();
        moveSnake();
        drawfood();
        drawSnake();
    }

    game = setInterval(gameloop,100);

    function moveSnake(){
        $.each(snake, function(index, value){
            snake[index].oldX = value.x;
            snake[index].oldY = value.y;
            if(index==0){
                if(keyPressed==DOWN){
                    snake[index].y = value.y + blockSize;
                }else if(keyPressed==UP){
                    snake[index].y = value.y - blockSize;
                }else if(keyPressed==RIGHT){
                    snake[index].x = value.x + blockSize;
                }else if(keyPressed==LEFT){
                    snake[index].x = value.x - blockSize;
                }
            }else{
                snake[index].x = snake[index - 1].oldX;
                snake[index].y = snake[index - 1].oldY;
            }
        })
    }


    function drawfood(){
        ctx.fillStyle = 'black';
        if(food.eaten == true){
            food = getNewPositionForFood();
        }
        ctx.fillRect(food.x, food.y, snakeWidth, snakeHeight);
    }


    function checkKeyIsAllowed(tempKey){
        let key;
        if(tempKey == DOWN){
            key = (keyPressed != UP) ? tempKey : keyPressed;
        }else if(tempKey == UP){
            key = (keyPressed != DOWN) ? tempKey : keyPressed;
        }else if(tempKey == LEFT){
            key = (keyPressed != RIGHT) ? tempKey : keyPressed;
        }else if(tempKey == RIGHT){
            key = (keyPressed != LEFT) ? tempKey : keyPressed;
        }
        return key;
    };

    $(document).keydown(function(e){
        if($.inArray(e.which, [DOWN,UP,LEFT,RIGHT]) != -1){
            keyPressed = checkKeyIsAllowed(e.which);
        }
    });


    function gameOver(){
        clearInterval(game);
        alert("GAME OVER !!!!");
    }

/*     function getNewPositionForFood(){
        let xArr = yArr = [], xy;
        $.each(snake, function(index, value){
            if($.inArray(value.x, xArr) == -1){
                xArr.push(value.x);
            }
            if($.inArray(value.y, yArr) == -1){
                yArr.push(value.y);
            }
        });
        xy = getEmptyXY(xArr, yArr); 
        return xy;
    }

    function getEmptyXY(xArr, yArr){
        let newX, newY;
        newX = getRandomNumber(canvas.width - 10, 10);
        newY= getRandomNumber(canvas.height - 10 ,10);
        if($.inArray(newX, xArr)== -1 && $.inArray(newY, yArr) != -1){
            return{
                x: newX, y:newY, eaten: false
            };
        }else{
            return getEmptyXY(xArr, yArr);
        }
    } 
    function getRandomNumber(max, multipleOf){
        let result = Math.floor(Math.random() * max);
        result = (result % 10 == 0) ? result : result * (multipleOf - result % 10);
        return result;
    }
 */
    function getNewPositionForFood(){
        let newX, newY;
        newX= Math.floor(Math.random()*((canvas.width - 10)/10))*10;
        newY= Math.floor(Math.random()*((canvas.width - 10)/10))*10;
        return{
            x: newX, y:newY
        };
    }
    

});