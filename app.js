var module = angular.module('TempoServicoApp',['ngMaterial', 'angularMoment']);

module.config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    $mdDateLocaleProvider.shortMonths = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    $mdDateLocaleProvider.days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    $mdDateLocaleProvider.shortDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    $mdDateLocaleProvider.parseDate = function(dateString) {
        // Se o usuário digitar manualmente, tratamos a data
        // convertendo a string para um padrão que o moment entenda.
        //
        if(dateString.indexOf("/") != -1) {
            var componentesData = dateString.split("/");
            componentesData.reverse();
            dateString = componentesData.join('-');
        }
        var m = moment(dateString, "YYYY-MM-DD");
        return m.isValid() ? m.toDate() : new Date(NaN);
    }

    $mdDateLocaleProvider.formatDate = function(date) {
        var m = moment(date);
        return m.isValid() ? m.format("DD/MM/YYYY") : '';
    }

    $mdDateLocaleProvider.msgCalendar = 'Calendário';
    $mdDateLocaleProvider.msgOpenCalendar = 'Abrindo o calendário';
});

module.controller('TempoServicoCrtl', ['$scope', 'moment', function($scope, moment) {
    $scope.form = {};
    $scope.form.dataFim = moment(new Date(), "YYYY-MM-DD").toDate();
    $scope.form.dataInicio = '';

    $scope.diferenca = "Aguardando datas";

    $scope.calcularTempoServico = function() {
        var tempoInicio = moment($scope.form.dataInicio);
        var tempoFim    = moment($scope.form.dataFim);
        $scope.diferenca = moment.preciseDiff(tempoInicio, tempoFim, true);

        $scope.diferenca = fraseDiferenca($scope.diferenca);
    }

    var fraseDiferenca = function(diferenca) {
        return (diferenca.years == 0 ? '' : diferenca.years + " anos") +
                (diferenca.months == 0 ? '' : ", " + diferenca.months + " meses") +
                (diferenca.days == 0 ? '' : ", " + diferenca.days + " dias") + ".";
    }
}]);