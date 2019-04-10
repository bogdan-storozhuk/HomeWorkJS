var money = prompt('Ваш бюджет на месяц?', ''),
    time = prompt('Введите дату в формате YYYY-MM-DD', '');
var appData = {
    budget: money,
    timeData: time,
    expenses: 'expenses{"' + prompt('Введите обязательную статью расходов в этом месяце', '') + ':' + prompt('Во сколько обойдется?', '') + '"}',
    optionalExpenses: '',
    income: '',
    savings: false,
    dailyBudget:function(){
        return money/30;
    }
};
alert(appData.dailyBudget());