'use strict';

describe('AddtocalendarCtrl', function() {
  beforeEach(module('jshor.angular-addtocalendar'));

  var $controller;

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  /**
   * Returns a sample event to test with.
   * 
   * @return {Object} params of event, mimicking directive scope params
   */
  function getSampleEvent() {

    return {
      startDate: '20150704T190000',
      endDate: '20150704T210000',
      title: 'A sample event!',
      description: 'Some interesting description here.',
      location: '1 Futurama Pl, New New York'
    };

  }

  /**
   * Yahoo! Calendar
   */
  describe('$scope.calendarUrl.yahoo', function() {

  	it('should return the url to add event to a yahoo calendar', function() {
  		var $scope = getSampleEvent();

      $controller('AddtocalendarCtrl', { $scope: $scope });

      var regex = CalendarRegex.getUrlRegex('calendar.yahoo.com/', {
      	v: 60,
      	view: 'd',
      	type: 20,
      	title: '(.*)',
      	st: dateRegex,
      	et: dateRegex,
      	desc: '(.*)',
      	in_loc: '(.*)'
      });

      var isValidYahooCalendar = regex.test($scope.calendarUrl.yahoo);

      expect(isValidYahooCalendar).toEqual(true);
  	});

  });

  /**
   * Google Calendar
   */
  describe('$scope.calendarUrl.google', function() {

    it('should return the url to add event to a google calendar', function() {
      var $scope = getSampleEvent();

      $controller('AddtocalendarCtrl', { $scope: $scope });

      var regex = CalendarRegex.getUrlRegex('www.google.com/calendar/render', {
        action: 'TEMPLATE',
        text: '(.*)',
        dates: dateRegex + '\\/' + dateRegex,
        details: '(.*)',
        location: '(.*)'
      });

      var isValidGoogleCalendar = regex.test($scope.calendarUrl.google);

      expect(isValidGoogleCalendar).toEqual(true);
    });

  });

  /**
   * iCalendar
   */
  describe('$scope.calendarUrl.icalendar', function() {

    it('should return the url and data of an icalendar file', function() {
      var $scope = getSampleEvent();

      $controller('AddtocalendarCtrl', { $scope: $scope });

      var regex = CalendarRegex.getIcsCalendarRegex();

      var isValidICalendar = regex.test($scope.calendarUrl.icalendar);

      expect(isValidICalendar).toEqual(true);
    });

  });

});