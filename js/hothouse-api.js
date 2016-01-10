/**
 * Created by Ivelina on 2.1.2016 г..
 */
$(document).ready(function(){
    var request = new XMLHttpRequest();
    var response = null;
    // Feature detection for CORS
    if ('withCredentials' in request) {
        request.open('GET', 'http://ivelinah.ddns.net/sensors', true);
        // Just like regular ol' XHR
        request.onreadystatechange = function() {

            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 400) {

                    response = request.response;
                    var responseObj = JSON.parse(response)
                    for(var sensorId in responseObj){
                        var sensor = (responseObj[sensorId]);

                        $('#' + sensor['name'] + '-value').html(sensor['value']);
                        var date = sensor['updated_at'].substring(0, 10);
                        var time = sensor['updated_at'].substring(10, 20);
                        $('#' + sensor['name'] + ' .last-updated-date').html(date);
                        $('#' + sensor['name'] + ' .last-updated-time').html(time);
                    }

                } else {
                    // Handle error case
                }
            }
        };
        request.send();
    }

    req = new XMLHttpRequest();
    response = null;
    // Feature detection for CORS
    if ('withCredentials' in req) {
        req.open('GET', 'http://ivelinah.ddns.net/controls', true);
        // Just like regular ol' XHR
        req.onreadystatechange = function() {

            if (req.readyState === 4) {
                if (req.status >= 200 && req.status < 400) {

                    response = req.response;
                    var responseObj = JSON.parse(response);
                    for(var sensorId in responseObj){
                        var sensor = (responseObj[sensorId]);
                        $('#' + sensor['name'] + ' .control-action').attr('data-status', sensor['status'] == 1 ? 0 : 1);
                        $('#' + sensor['name'] + ' .control-action').attr('data-name', sensor['name']);

                        if(sensor['status'] == 1) {
                            $('#' + sensor['name'] + ' .condition').html('ON');
                            $('#' + sensor['name'] + ' .condition').addClass('on');
                            $('#' + sensor['name'] + ' .control-action').html('ЗАТВОРИ');
                        } else {
                            $('#' + sensor['name'] + ' .condition').html('OFF');
                            $('#' + sensor['name'] + ' .condition').addClass('off');
                            $('#' + sensor['name'] + ' .control-action').html('ОТВОРИ');
                        }
                        $('#' + sensor['name'] + '-value').html(sensor['value']);
                        var date = sensor['updated_at'].substring(0, 10);
                        var time = sensor['updated_at'].substring(10, 20);
                        $('#' + sensor['name'] + ' .last-updated-date').html(date);
                        $('#' + sensor['name'] + ' .last-updated-time').html(time);
                    }

                } else {
                    // Handle error case
                }
            }
        };
        req.send();
    }
    
    $('.control-action').on('click', function () {
        var status = $(this).attr('data-status');
        var name = $(this).attr('data-name');
        var reqPUT = new XMLHttpRequest();
        // Feature detection for CORS
        if ('withCredentials' in reqPUT) {
            var data = "value=15";
            reqPUT.open('PUT', 'http://ivelinah.ddns.net/controls' + name);
            // Just like regular ol' XHR
            reqPUT.onreadystatechange = function() {
                if (reqPUT.readyState === 4) {
                    if (reqPUT.status >= 200 && reqPUT.status < 400) {
                        console.log(reqPUT.response);
                        location.reload();

                    } else {
                        // Handle error case
                    }
                }
            };
            reqPUT.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            reqPUT.send("status=" + status);
        }

    });
});
