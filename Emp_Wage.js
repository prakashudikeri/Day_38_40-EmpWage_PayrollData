    const IS_PART_TIME = 1; const IS_FULL_TIME = 2; const PART_TIME_HOURS = 4;
    const FULL_TIME_HOURS = 8;  const WAGE_PER_HOUR = 20;   const NUM_OF_WORKING_DAYS = 20;
    const MAX_HRS_IN_MONTH = 160;
    let empDailyWageMap = new Map();
    let empDailyHrsMap = new Map();
        function getWorkingHours(empCheck){
            switch(empCheck){
                case IS_PART_TIME:  return PART_TIME_HOURS;
                case IS_FULL_TIME:  return FULL_TIME_HOURS;
                default:            return 0;
            }
        }
    function calcDailyWage(empHrs){ return empHrs * WAGE_PER_HOUR; }
    let totalEmpHrs = 0;    let totalWorkingDays = 0;   let empDailyWageArr = new Array();   
    let empDailyHrsAndWageArr = new Array();

    //UC10 - Object creation
        while (totalEmpHrs <= MAX_HRS_IN_MONTH && totalWorkingDays < NUM_OF_WORKING_DAYS) {
            totalWorkingDays++;
            let empCheck = Math.floor(Math.random() * 10) % 3;
            let empHrs = getWorkingHours(empCheck);
            totalEmpHrs += empHrs;
                empDailyHrsAndWageArr.push({
                    dayNum: totalWorkingDays,   dailyHours: empHrs, dailyWage: calcDailyWage(empHrs),
                    toString() {
                        return '\n Day' +this.dayNum+ ' => Working Hours is ' +this.dailyHours+ ' And Wage Earned = ' +this.dailyWage
                    },
                });
        }
    //console.log ("UC10- Showing Daily Hours Worked and Wage Earned: "+empDailyHrsAndWageArr);

    //UC11 Using Object functions along wid arrow function
        let totalWages = empDailyHrsAndWageArr
                            .filter(dailyHrsAndWage => dailyHrsAndWage.dailyWage > 0 )
                            .reduce((totalWages, dailyHrsAndWage) => totalWages += dailyHrsAndWage.dailyWage, 0);
        let totalHours = empDailyHrsAndWageArr
                            .filter(dailyHrsAndWage => dailyHrsAndWage.dailyHours > 0 )
                            .reduce((totalHours, dailyHrsAndWage) => totalHours += dailyHrsAndWage.dailyHours, 0);
        console.log("UC-11A- Total Hours: " +totalHours+ ", Total Wages: "+totalWages);

        process.stdout.write("UC-11B- Logging Full Work Days ")
            empDailyHrsAndWageArr.filter(dailyHrsAndWage => dailyHrsAndWage.dailyHours == 8)
                                 .forEach(dailyHrsAndWage => process.stdout.write(dailyHrsAndWage.toString()));
        
        let partWorkingDayStrArr = empDailyHrsAndWageArr.filter(dailyHrsAndWage => dailyHrsAndWage.dailyHours == 4)
                                                        .map(dailyHrsAndWage => dailyHrsAndWage.toString());
        console.log ("\nUC11- C - Part Working Day String: "+partWorkingDayStrArr);
        let nonWorkingDaysNums = empDailyHrsAndWageArr.filter(dailyHrsAndWage => dailyHrsAndWage.dailyHours == 0)
                                                      .map(dailyHrsAndWage => dailyHrsAndWage.dayNum);
        console.log("UC 11 D - NonWorkingNums" +nonWorkingDaysNums);

    {
        while (totalEmpHrs < MAX_HRS_IN_MONTH && totalWorkingDays < NUM_OF_WORKING_DAYS ){
            totalWorkingDays++;
            let empCheck = Math.floor(Math.random() * 10) % 3;
            let empHrs = getWorkingHours(empCheck);
            totalEmpHrs += empHrs;
            empDailyWageArr.push(calcDailyWage(empHrs))
            empDailyWageMap.set(totalWorkingDays, calcDailyWage(empHrs));
            empDailyHrsMap.set(totalWorkingDays, empHrs);
        }
        let empWage = calcDailyWage(totalEmpHrs);
            console.log("Total Days: "+totalWorkingDays+ ", Total Hours: " +totalEmpHrs+ ", Emp Wage: " + empWage);

    //UC7A - calc total wage using arr foreach traversal or reduce method
        let totEmpWage = 0;
        function sum(dailWage){ totEmpWage += dailWage; }
            empDailyWageArr.forEach(sum);
            console.log("7a - Total Days: "+totalWorkingDays+ ", Total Hours: " +totalEmpHrs+ ", Emp Wage: " + totEmpWage);

        //function totalWages(totalWage, dailWage){ return totalWage + dailWage; }
        console.log("7A - Emp wage with reduce: " + empDailyWageArr.reduce(totalWages, 0));

    //7B - Show the day along with daily wage using array map helper func
        let dailyCntr = 0;
            function mapDailyWithWage(dailWage){
                dailyCntr++;
                return dailyCntr + " = " + dailWage;
            }
        let mapDayWithWageArr = empDailyWageArr.map(mapDailyWithWage);
            console.log("7B - Daily Wage Map -");
            console.log(mapDayWithWageArr);

    //7C - SHow days when full time wafe of 160 were earned
        function fulltimeWage(dailWage){ return dailWage.includes ("160"); }
        let fullDayWageArr = mapDayWithWageArr.filter(fulltimeWage);
            console.log("7C - Daily Wage Filter When FUlltime Wage Earned");
            console.log(fullDayWageArr);

    //7d - Find the first occurence when full time wage - find func
        function findFulltimeWage(dailWage){ return dailWage.includes("160"); }
        console.log ("7D - 1st Full time fulltime wage earned on day: " + mapDayWithWageArr.find(findFulltimeWage));

    //7e - check if every element of full time wage is truely holding full time wage
        function isAllFulltimeWage(dailWage){ return dailWage.includes("160"); }
        console.log ("7E - Check all element have full time wage : " + fullDayWageArr.every(isAllFulltimeWage));

    //7f - CHeck if there is any part time wage
        function isAnyPartTimeWage(dailWage){ return dailWage.includes("80"); }
        console.log( "7F - Check if Any Part time wage: " + mapDayWithWageArr.some(isAnyPartTimeWage));

    //7g- find the number of days the employees worked
            function totalDaysWorked(numOfDays, dailWage){
                if (dailWage > 0) return numOfDays+1;
                return numOfDays;
            }
        console.log ("7G - Number of days Emp worked : " + empDailyWageArr.reduce(totalDaysWorked, 0));

    //UC8 - 
        console.log(empDailyWageMap);
        console.log("UC8 - EMp wage Map totalhrs - " + 
                    Array.from(empDailyWageMap.values()).reduce(totalWages,0));

    //UC9 - Arrow Functions
        const findTotal = (totalVal, dailyVal) => {
            return totalVal + dailyVal;
        }
        let count = 0;
        let totalHours = Array.from(empDailyHrsMap.values()).reduce(findTotal, 0);
        let totalSalary = empDailyWageArr.filter(dailyWage => dailyWage > 0).reduce(findTotal, 0);
            console.log ("UC9- Emp Wage with Arroww: "+"Total Hours: "+totalHours+" ,Total Wages: "+ totalSalary);

        let nonWorkingDays = new Array();
        let partWorkingDays = new Array();
        let fullWorkingDays = new Array();
            empDailyHrsMap.forEach((value, key, map) => {
                if (value == 8) fullWorkingDays.push(key);
                else if (value == 4) partWorkingDays.push(key);
                else nonWorkingDays.push(key);
            });
        console.log("Full Working Days: "+fullWorkingDays);
        console.log("Part Working Days: "+partWorkingDays);
        console.log("Non Working Days: "+nonWorkingDays);
    }

    