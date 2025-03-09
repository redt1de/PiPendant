

# TODO
 - filter $G polling commands in console output
 - figure out tool and spindle updates, spindle speed doesnt update  $G = [GC:G0 G54 G17 G21 G91 G94 M5 M9 T0 F0 S0] ?? see state stuff below
  - status messages not working right
- cycle group buttons, disable as needed process various states
- connect/disconnect still a little funky

#### controller:state vs Grbl:state
42["Grbl:state",{"status":{"activeState":"","mpos":{"x":"0.000","y":"0.000","z":"0.000"},"wpos":{"x":"0.000","y":"0.000","z":"0.000"},"ov":[]},"parserstate":{"modal":{"motion":"G0","wcs":"G54","plane":"G17","units":"G21","distance":"G91","feedrate":"G94","spindle":"M5","coolant":"M9"},"tool":"0","feedrate":"0","spindle":"0"}}]
42["controller:state","Grbl",{"status":{"activeState":"","mpos":{"x":"0.000","y":"0.000","z":"0.000"},"wpos":{"x":"0.000","y":"0.000","z":"0.000"},"ov":[]},"parserstate":{"modal":{"motion":"G0","wcs":"G54","plane":"G17","units":"G21","distance":"G91","feedrate":"G94","spindle":"M5","coolant":"M9"},"tool":"0","feedrate":"0","spindle":"0"}}]
 


https://github.com/cncjs/cncjs-pendant-ps3/blob/master/index.js
https://github.com/cncjs/cncjs/wiki/Controller-API



# Events CNCJs Emits
startup	                 {loadedControllers, baudrates, ports}
config:change	         config
task:start	             taskId
task:finish	             (taskId, code)
task:error	             (taskId, err)

serialport:list	         ports
serialport:change	     {port, inuse=true}
serialport:open	         {port, baudrate, controllerType, inuse=true}
serialport:close	     {port, inuse=false}
serialport:error	     {err, port}
serialport:read	         serial output
serialport:write	     (data, {...context, source})

gcode:load	             (name, gcode, context)
gcode:unload	         none

feeder:status	         {hold, holdReason, queue, pending, changed}
sender:status	         {sp, hold, holdReason, name, context, size, total, sent, received, startTime, finishTime, elapsedTime, remaniningTime}
workflow:state	         workflow.state
controller:settings	     ('Grbl', {version, parameters, settings)
controller:state	     'Grbl', {state, parserstate}
message	


# Events CNCJs Listens
open	   openPort(port, options, callback)
close	   closePort(port, callback)
list	   listPorts(callback)
command	   command(cmd, port, ...args)
write	   write(port, data, context)
writeln	   writeln(port data, context)





## GrblState
```json
{
    "status": {
        "activeState": "Alarm",
        "mpos": {
            "x": "0.000",
            "y": "0.000",
            "z": "0.000"
        },
        "wpos": {
            "x": "-2.000",
            "y": "-2.000",
            "z": "2.000"
        },
        "ov": [
            100,
            100,
            100
        ],
        "subState": 0,
        "wco": {
            "x": "2.000",
            "y": "2.000",
            "z": "-2.000"
        },
        "buf": {
            "planner": 15,
            "rx": 128
        },
        "feedrate": 0,
        "spindle": 0
    },
    "parserstate": {
        "modal": {
            "motion": "G0",
            "wcs": "G54",
            "plane": "G17",
            "units": "G21",
            "distance": "G90",
            "feedrate": "G94",
            "spindle": "M5",
            "coolant": "M9"
        },
        "tool": "0",
        "feedrate": "0",
        "spindle": "0"
    }
}
```