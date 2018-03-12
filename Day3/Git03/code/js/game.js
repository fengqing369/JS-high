//游戏控制对象：
		(function(){

			function Game(options){
				//设置属性：食物，小蛇，地图
				this.food = options.food;
				this.snake = options.snake;
				this.map = map;
			}
			Game.prototype.init = function(){
				//1 绘制食物
				this.food.init();

				//2 绘制小蛇
				this.snake.init();

				//3 让小蛇运动
				this.snakeRun();

				//设置一个功能，用于按键控制小蛇运动
				this.changeDirection();
			};

			//设置小蛇运动的方法
			Game.prototype.snakeRun = function(){
				var that = this;
				//设置定时器，让小蛇进行自动运动
				var timer = setInterval(function(){
					var snake = that.snake;//小蛇对象
					var snakeBody = snake.body;//蛇身所有信息
					var food = that.food;//食物
					var snakeHead = snakeBody[snakeBody.length-1];//蛇头

					//获取蛇尾的坐标信息
					var snakeTail = snakeBody[0];

					//调用小蛇的move方法
					//注意：定时器中的this指向window对象，不能直接使用
					snake.move();

					// --- 当小蛇移动后，检测是否吃到了食物 ---
					// 检测蛇头与食物的坐标，如果相同，说明吃到了食物
					if(snakeHead.x === food.x && snakeHead.y === food.y){
						//吃到食物后，需要给蛇身中添加一组新的坐标值
						//这组坐标通过观察发现，就是小蛇移动前的蛇尾坐标值

						//不能进行直接放入，否则会导致两个蛇尾重复
						// snakeBody.unshift(snakeTail);
						snakeBody.unshift(
							{x:snakeTail.x,y:snakeTail.y,bgColor:"orange"}
						);

						//重新绘制一个食物
						food.init();
					}

					//检测是否游戏结束
					//1 撞墙死
					//检测蛇头的坐标与最大坐标值之间的关系
					//右侧与下侧的检测
					if(snakeHead.x < 0 || snakeHead.y < 0){
						alert("游戏结束,撞到了边界");
						clearInterval(timer);
						return;
					}

					//2 撞到自己的身体后死
					//通过观察我们发现，snakeBody中的最后4个值是不会被蛇头碰到的
					if(snakeBody.length > 4){
						for(var i = snakeBody.length-5; i>=0; i--){
							//如果有任何一个蛇身的坐标与蛇头相同，结束游戏
							if(snakeHead.x === snakeBody[i].x && snakeHead.y === snakeBody[i].y){
								alert("游戏结束,撞到了自己");
								clearInterval(timer);
								return;
							}
						}
					}


					//如果move与init同时执行，会导致游戏结束后小蛇走到地图外一步(正常的)
					//如果不希望出现这个效果，可以将move与init分开
					//move后，检测坐标值是否处于边界内部，如果是，进行绘制，如果不是，就不绘制了。
					snake.init();

					//move - 修改的是坐标
					//边界检测：只有move后的坐标是合法值时，再进行绘制操作
					//init - 根据坐标绘制页面结构

				},100);
			}

			//设置按键操作
			Game.prototype.changeDirection = function(){
				var that = this;
				//给document设置一个keydown事件
				document.onkeydown = function(e){
					var e = e || window.event;

					//根据keyCode属性的值设置小蛇的方向属性
					/*switch(e.keyCode){
						case 37:
							that.snake.direction = "left";
							break;
						case 38:
							that.snake.direction = "up";
							break;
						case 39:
							that.snake.direction = "right";
							break;
						case 40:
							that.snake.direction = "down";
							break;
					}*/

					// --- 修改功能，为了防止反向运动的问题
					//     在设置时设置检测，只有在direction属性不是对向时才进行设置
					switch(true){
						case e.keyCode == 37 && that.snake.direction !== "right":
							that.snake.direction = "left";
							break;
						case e.keyCode == 40 && that.snake.direction !== "up":
							that.snake.direction = "down";
							break;
					
					
					}
				}
			}

			window.Game = Game;

		})();