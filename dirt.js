// to be moved to a seperate file later, I'm a little lazy
			function nameTag(r, n, y){
				return "<div class='nametag'><span class='rank'>" + r + "</span>" + n + " '<span class='yeartag'>" + y.toString().substr(2, 2) +"</span></div>";
			}

			function moreTag(roomNum,k){
				return "<div id='fullroombtn" + roomNum + "' class='hiddenlistbtn moretag'>+ " + k +" more</div>";
			}


			$(document).ready(function(){
				$("#yourname").text(myName);
				var numRooms = 77;
				currSelectRoom = false;

				ss = [8, 12, 22, 26, 34, 44, 56, 75];
				sd = [20, 14, 66, 75];
				dne = [228, 229, 230, 217, 245, 247, 248, 249, 255, 267, 273,
						317, 345, 347, 348, 349, 367, 373,
						417, 445, 447, 448, 449, 467, 473,
						517, 545, 547, 548, 549, 567, 573];

				for (floor = 2; floor <= 5; floor ++){
					var html = "<table>";
					html += "<tr><th>Room</th><th>Contestants</th></tr>";
					for (i = 1; i < numRooms; i ++){
						roomNum = i + floor * 100;
						if (dne.indexOf(roomNum) == -1){
							html += "<tr>";
							if (floor > 2 && ss.indexOf(i) > -1){
								img = "<img src='style/solarsing.png' />";
							} else if (floor > 2 && sd.indexOf(i) > -1){
								img = "<img src='style/solardoub.png' />";
							} else {
								img = "";
							}

							html += "<td class='roomnum-table'>" + roomNum + " " + img + "</td>";
							html += "<td id='room" + roomNum +"'>none</td><td class='chooseroombtnlist'><a title='choose this room' href='#' id='plus" + roomNum + "'>+</a></td>";

							html += "</tr>";
						}
					}
					html += "</table>";
					$("#floor" + floor + " .roomlisting").html(html);
				}

				var data = new Firebase('https://kyc.firebaseIO.com/');
				data.on('value', function(snapshot) {

					obj = snapshot.val();
					for (k in Object.keys(obj.rooms)){
						roomNum = Object.keys(obj.rooms)[k]
						contestantslist = Object.keys(obj.rooms[roomNum]);
						html = ""


						if (contestantslist.length > 0){
							contestant = contestantslist[0];
							r = obj.rooms[roomNum][contestant].rank;
							y = obj.rooms[roomNum][contestant].year;
							html += nameTag(r, contestant, y);

							// if more than one person
							if (contestantslist.length > 1){
								html += "<div id='fullroom" + roomNum + "' class='hiddenlist' style='display:none'>";
								// people who are not the first
								for (i in contestantslist){
									if (i != 0){
										contestant = contestantslist[i];
										r = obj.rooms[roomNum][contestant].rank;
										y = obj.rooms[roomNum][contestant].year;
										html += nameTag(r, contestantslist[i], y);
									}
								}
								nummore = contestantslist.length - 1
								html += "</div>";
								html += moreTag(roomNum, nummore);

								selector = $("#fullroombtn" + roomNum);
								$("#room" + roomNum).on("click", selector, function(){
									roomid = $(this).attr('id')
									$("#" + roomid + " .hiddenlist").show();
									$("#" + roomid + " .hiddenlistbtn").hide();
								});
							}
						} 

						$("#room" + roomNum).html(html);
					}




				f2 = $("#floorheader2").position().top;
				f3 = $("#floorheader3").position().top;
				f4 = $("#floorheader4").position().top;
				f5 = $("#floorheader5").position().top;
/*
				$(document).scroll(function() {

					if (window.pageYOffset > f2){
						$("#floorheader2").css({"position": "fixed"});
						$("#floorheader2").css({"top": "0"});
						$("#floorheader2").css({"z-index": "100"});
					} else {
						$("#floorheader2").css({"position": "relative"});
						//$("#floorheader2").css({"z-index": "-4"});
					}

					if (window.pageYOffset > f3){
						$("#floorheader3").css({"position": "fixed"});
						$("#floorheader3").css({"top": "0"});
						$("#floorheader3").css({"z-index": "101"});
					} else {
						$("#floorheader3").css({"position": "relative"});
						//$("#floorheader3").css({"z-index": "-3"});
					}

					if (window.pageYOffset > f4){
						$("#floorheader4").css({"position": "fixed"});
						$("#floorheader4").css({"top": "0"});
						$("#floorheader4").css({"z-index": "102"});
					} else {
						$("#floorheader4").css({"position": "relative"});
						//$("#floorheader4").css({"z-index": "-2"});
					}

					if (window.pageYOffset > f5){
						$("#floorheader5").css({"position": "fixed"});
						$("#floorheader5").css({"top": "0"});
						$("#floorheader5").css({"z-index": "103"});
					} else {
						$("#floorheader5").css({"position": "relative"});
						//$("#floorheader5").css({"z-index": "-1"});
					}

				});

*/



				});

				$("tr").hover(function(){
				});

				$("#choice1").click(function(){
					if (currSelectRoom != 1){
						disableChoosing();
						enableChoosing(1);
					} else {
						disableChoosing();
					}
				});

				$("#choice2").click(function(){
					if (currSelectRoom != 2){
						disableChoosing();
						enableChoosing(2);
					} else {
						disableChoosing();
					}
				});

				$("#choice3").click(function(){
					if (currSelectRoom != 3){
						disableChoosing();
						enableChoosing(3);
					} else {
						disableChoosing();
					}
				});

                // moved enableChoosing & disableChoosing to next-housing.js.
			});