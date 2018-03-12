//小蛇对象
		(function(){

			function Snake(options){
				//设置小蛇的属性
				//小蛇每个盒子的宽高都是相同的，但是颜色是不同的
				this.width = options.width || 20;
				this.height = options.height || 20;

				//根据小蛇的初始位置设置坐标值

				//由于蛇身有多个部分（多个盒子），坐标与背景色都是不同的
				//所以设置为多个对象形式进行分别保存
				this.body = [
					{x:1,y:1,bgColor:"orange"},
					{x:2,y:1,bgColor:"orange"},
					{x:3,y:1,bgColor:"red"}
				];

				//地图：小蛇最终要放置的位置
				this.map = options.map;

				//elements属性用于保存蛇身的小盒子
				this.elements = [];

				// --- 添加一个属性，用于设置小蛇当前运动的方向
				this.direction = "right";
			}

			//设置小蛇的初始化方法
			Snake.prototype.init = function(){
				//删除旧的蛇身:
				//由于蛇身的结构为多个，并且保存在数组中，所以如果没有任何一个蛇身，循环是不会执行的
				//所以不需要设置检测

				//如果使用正向遍历操作，会出现跳项的问题
				/*var arr = [1,2,3,4,5];
				for(var i = 0; i < arr.length; i++){
					arr.splice(i,1);
				}
				console.log(arr);*/ //没有删除掉所有的元素，需要更改为反向遍历

				for (var i = this.elements.length - 1; i >= 0; i--) {
					this.map.removeChild(this.elements[i]);
				}
				//进行数组的清除
				this.elements = [];

				//------------后面的代码为新蛇身创建的代码-------------
				//1 创建结构div
				var body = this.body;
				var div,currentBody;
				for (i = 0; i < body.length; i++) {
					//currentBody用于缓存body中的某个对象值
					currentBody = body[i];
					div = document.createElement("div");

					//2 设置样式(设置宽 高 背景色 left top)
					div.style.width = this.width + "px";
					div.style.height = this.height + "px";
					div.style.backgroundColor = currentBody.bgColor;
					div.style.left = currentBody.x * this.width + "px";
					div.style.top = currentBody.y * this.height + "px";

					//3 放入到地图中显示
					this.map.appendChild(div);

					// --- 后期添加的功能，保存蛇身的盒子
					this.elements.push(div);
				}


				//console.log(this.elements);
			};

			//设置小蛇的移动方法:
			Snake.prototype.move = function(){
				//通过观察我们发现，每次小蛇移动时，只有蛇头的坐标是最新的，其余蛇身盒子的坐标都是以前的旧值(需要进行错位)

				for(var i = 0; i < this.body.length - 1; i++){
					//第i个元素需要更新为i+1的值

					//这种方式设置完毕后看似是没有问题的
					//但是当修改啊了蛇头的坐标后，导致蛇脖子的坐标也随之修改(原因是，对复杂数据类型进行了复制操作)
					this.body[i].x = this.body[i+1].x;
					this.body[i].y = this.body[i+1].y;
				}
				
				//下面这个代码只是向右运动的代码
				//需要根据this.direction属性的值进行对应设置
				switch(this.direction){
					case "right":
						this.body[this.body.length - 1].x++;
						break;
					case "left":
						this.body[this.body.length - 1].x--;
						break;
					case "up":
						this.body[this.body.length - 1].y--;
						break;
					case "down":
						this.body[this.body.length - 1].y++;
						break;
				}


				//当小蛇的坐标更新后，需要重新绘制小蛇
				// --- 为了游戏结束的效果好看，移动到Game的snakeRun方法中了
				//this.init();

			};

			window.Snake = Snake;

		})();