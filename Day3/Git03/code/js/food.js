(function(){

			function Food(options){
				//属性
				this.width = options.width || 20;
				this.height = options.height || 20;
				this.bgColor = options.bgColor || "green";

				//设置盒子的位置属性:
				//    位置设置时使用left和top，但是这个值不能随便设置，需要有固定的间隔
				//    这个间隔就是一个盒子的宽度
				//	  所以我们只需要设置一个随机的坐标值即可(范围为0-39之间的随机整数)
				this.x = 0;
				this.y = 0;

				//为了功能扩展方便，可以将地图也设置为一个属性，表示这个食物的放置位置
				this.map = options.map;

				//这个属性用于保存创建过的食物盒子(DOM元素)
				this.element;
			}

			//设置方法：
			//  init 表示初始化
			Food.prototype.init = function(){

				//在创建新食物之前将旧的食物删除
				//检测this.element属性中是否存在一个DOM对象，如果有，删除，如果没有，直接创建新的
				if(this.element){
					//从地图中删除这个元素
					this.map.removeChild(this.element);
				}

				//--------下面的内容为新食物盒子的创建操作---------
				//1 创建一个盒子div
				var div = document.createElement("div");

				//使用element属性保存创建的食物盒子
				this.element = div;

				//2 设置样式
				div.style.width = this.width + "px";
				div.style.height = this.height + "px";
				div.style.backgroundColor = this.bgColor;

				//3 计算随机的left与top
				var maxWidthCount = Math.floor(this.map.offsetWidth / this.width);
				var maxHeightCount = Math.floor(this.map.offsetHeight / this.height);
				this.x = Math.floor(Math.random() * maxWidthCount);
				this.y = Math.floor(Math.random() * maxHeightCount);
				div.style.left = this.x * this.width + "px";
				div.style.top = this.y * this.height + "px";

				//4 放入到地图中
				this.map.appendChild(div);

			}

			//下面的所有代码都是用于检测功能是否正常的，不是真正使用的代码

			
			//食物对象的功能需要结合小蛇对象与游戏控制对象共同使用，需要暴露给全局作用域
			window.Food = Food;

		})()