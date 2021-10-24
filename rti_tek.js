// external converter file for Rti-Tek TRV601 thermostatic radiator valve.
// just copy to /config/zigbee2mqtt and add it to your configuration.yaml like this:
// external_converters:
//  - rti_tek.js


const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
// const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const e = exposes.presets;
const ea = exposes.access;
const tuya = require("zigbee-herdsman-converters/lib/tuya");

const tuyaLocal = {
    dataPoints: {
        // Rti-Tek thermostat
        rtitekSystemMode: 1,
        rtitekHeatingSetpoint: 2,
        rtitekLocalTemp: 3,
        rtitekBoostHeating: 4,
        rtitekBoostHeatingCountdown: 5,
        rtitekRunningState: 6,
        rtitekWindowState: 7,
        rtitekWindowDetection: 8,
        rtitekChildLock: 12,
        rtitekBattery: 13,
        rtitekFaultAlarm: 14,
        rtitekMinTemp: 15,
        rtitekMaxTemp: 16,
        rtitekScheduleMonday: 17,
        rtitekScheduleTuesday: 18,
        rtitekScheduleWednesday: 19,
        rtitekScheduleThursday: 20,
        rtitekScheduleFriday: 21,
        rtitekScheduleSaturday: 22,
        rtitekScheduleSunday: 23,
        rtitekTempCalibration: 101,
        rtitekValvePosition: 102,
        rtitekSoftVersion: 150,
    },
};

const fzLocal = {
    rtitek_thermostat: {
        cluster: 'manuSpecificTuya',
        type: ['commandGetData', 'commandSetDataResponse'],
        convert: (model, msg, publish, options, meta) => {
            const dp = msg.data.dp;
            const value = tuya.getDataValue(msg.data.datatype, msg.data.data);
            const runningStateLookup = {0: 'idle', 1: 'heat'};
            const systemModeLookup = {0: 'auto', 1: 'fan_only', 2: 'off', 3: 'heat'};

            switch (dp) {
            case tuyaLocal.dataPoints.rtitekSystemMode:
                return {system_mode: systemModeLookup[value]};
            case tuyaLocal.dataPoints.rtitekHeatingSetpoint:
                return {current_heating_setpoint: parseFloat((value / 10).toFixed(1))};
            case tuyaLocal.dataPoints.rtitekLocalTemp:
                return {local_temperature: parseFloat((value / 10).toFixed(1))};
            case tuyaLocal.dataPoints.rtitekBoostHeating:
                break; // seems not to work, also not available in SmartHome App
//                return {boost_heating: value ? 'ON' : 'OFF'};
            case tuyaLocal.dataPoints.rtitekBoostHeatingCountdown:
                break; // seems not to work, also not available in SmartHome App
//                return {boost_heating_countdown: value};
            case tuyaLocal.dataPoints.rtitekRunningState:
                return {running_state: runningStateLookup[value]};
            case tuyaLocal.dataPoints.rtitekWindowState:
                return {window: value ? 'OPEN' : 'CLOSED'};
            case tuyaLocal.dataPoints.rtitekWindowDetection:
                return {window_detection: value ? 'ON' : 'OFF'};
            case tuyaLocal.dataPoints.rtitekChildLock:
                return {child_lock: value ? 'LOCK' : 'UNLOCK'};
            case tuyaLocal.dataPoints.rtitekBattery:
                return {battery: value};
            case tuyaLocal.dataPoints.rtitekFaultAlarm:
                return {fault_alarm: value};
            case tuyaLocal.dataPoints.rtitekMinTemp:
                return {min_temperature: parseFloat((value / 10).toFixed(1))};
            case tuyaLocal.dataPoints.rtitekMaxTemp:
                return {max_temperature: parseFloat((value / 10).toFixed(1))};
            case tuyaLocal.dataPoints.rtitekScheduleMonday:
                return {
                    program_monday:
                        {monday: ('0' + value[1]).slice(-2) + ':' + ('0' + value[2]).slice(-2) + ' -> ' + value[4]/10 + '°C' +
                                '  |  ' + ('0' + value[5]).slice(-2) + ':' + ('0' + value[6]).slice(-2) + ' -> ' + value[8]/10 + '°C' +
                                '  |  ' + ('0' + value[9]).slice(-2) + ':' + ('0' + value[10]).slice(-2) + ' -> ' + value[12]/10 + '°C' +
                                '  |  ' + ('0' + value[13]).slice(-2) + ':' + ('0' + value[14]).slice(-2) + ' -> ' + value[16]/10 + '°C'},
                };
            case tuyaLocal.dataPoints.rtitekScheduleTuesday:
                return {
                    program_tuesday:
                        {tuesday: ('0' + value[1]).slice(-2) + ':' + ('0' + value[2]).slice(-2) + ' -> ' + value[4]/10 + '°C' +
                                '  |  ' + ('0' + value[5]).slice(-2) + ':' + ('0' + value[6]).slice(-2) + ' -> ' + value[8]/10 + '°C' +
                                '  |  ' + ('0' + value[9]).slice(-2) + ':' + ('0' + value[10]).slice(-2) + ' -> ' + value[12]/10 + '°C' +
                                '  |  ' + ('0' + value[13]).slice(-2) + ':' + ('0' + value[14]).slice(-2) + ' -> ' + value[16]/10 + '°C'},
                };
            case tuyaLocal.dataPoints.rtitekScheduleWednesday:
                return {
                    program_wednesday:
                        {wednesday: ('0' + value[1]).slice(-2) + ':' + ('0' + value[2]).slice(-2) + ' -> ' + value[4]/10 + '°C' +
                                '  |  ' + ('0' + value[5]).slice(-2) + ':' + ('0' + value[6]).slice(-2) + ' -> ' + value[8]/10 + '°C' +
                                '  |  ' + ('0' + value[9]).slice(-2) + ':' + ('0' + value[10]).slice(-2) + ' -> ' + value[12]/10 + '°C' +
                                '  |  ' + ('0' + value[13]).slice(-2) + ':' + ('0' + value[14]).slice(-2) + ' -> ' + value[16]/10 + '°C'},
                };
            case tuyaLocal.dataPoints.rtitekScheduleThursday:
                return {
                    program_thursday:
                        {thursday: ('0' + value[1]).slice(-2) + ':' + ('0' + value[2]).slice(-2) + ' -> ' + value[4]/10 + '°C' +
                                '  |  ' + ('0' + value[5]).slice(-2) + ':' + ('0' + value[6]).slice(-2) + ' -> ' + value[8]/10 + '°C' +
                                '  |  ' + ('0' + value[9]).slice(-2) + ':' + ('0' + value[10]).slice(-2) + ' -> ' + value[12]/10 + '°C' +
                                '  |  ' + ('0' + value[13]).slice(-2) + ':' + ('0' + value[14]).slice(-2) + ' -> ' + value[16]/10 + '°C'},
                };
            case tuyaLocal.dataPoints.rtitekScheduleFriday:
                return {
                    program_friday:
                        {friday: ('0' + value[1]).slice(-2) + ':' + ('0' + value[2]).slice(-2) + ' -> ' + value[4]/10 + '°C' +
                                '  |  ' + ('0' + value[5]).slice(-2) + ':' + ('0' + value[6]).slice(-2) + ' -> ' + value[8]/10 + '°C' +
                                '  |  ' + ('0' + value[9]).slice(-2) + ':' + ('0' + value[10]).slice(-2) + ' -> ' + value[12]/10 + '°C' +
                                '  |  ' + ('0' + value[13]).slice(-2) + ':' + ('0' + value[14]).slice(-2) + ' -> ' + value[16]/10 + '°C'},
                };
            case tuyaLocal.dataPoints.rtitekScheduleSaturday:
                return {
                    program_saturday:
                        {saturday: ('0' + value[1]).slice(-2) + ':' + ('0' + value[2]).slice(-2) + ' -> ' + value[4]/10 + '°C' +
                                '  |  ' + ('0' + value[5]).slice(-2) + ':' + ('0' + value[6]).slice(-2) + ' -> ' + value[8]/10 + '°C' +
                                '  |  ' + ('0' + value[9]).slice(-2) + ':' + ('0' + value[10]).slice(-2) + ' -> ' + value[12]/10 + '°C' +
                                '  |  ' + ('0' + value[13]).slice(-2) + ':' + ('0' + value[14]).slice(-2) + ' -> ' + value[16]/10 + '°C'},
                };
            case tuyaLocal.dataPoints.rtitekScheduleSunday:
                return {
                    program_sunday:
                        {sunday: ('0' + value[1]).slice(-2) + ':' + ('0' + value[2]).slice(-2) + ' -> ' + value[4]/10 + '°C' +
                                '  |  ' + ('0' + value[5]).slice(-2) + ':' + ('0' + value[6]).slice(-2) + ' -> ' + value[8]/10 + '°C' +
                                '  |  ' + ('0' + value[9]).slice(-2) + ':' + ('0' + value[10]).slice(-2) + ' -> ' + value[12]/10 + '°C' +
                                '  |  ' + ('0' + value[13]).slice(-2) + ':' + ('0' + value[14]).slice(-2) + ' -> ' + value[16]/10 + '°C'},
                };
            case tuyaLocal.dataPoints.rtitekTempCalibration:
                return {local_temperature_calibration: parseFloat((value / 10).toFixed(1))};
            case tuyaLocal.dataPoints.rtitekValvePosition:
                return {position: parseFloat((value / 10).toFixed(1))};
            case tuyaLocal.dataPoints.rtitekSoftVersion:
                return {software_version: value};
            default:
                meta.logger.warn(`zigbee-herdsman-converters:Rti-Tek thermostat: Unrecognized DP #${
                    dp} with data ${JSON.stringify(msg.data)}`);
            }
        },
    },
};

const tzLocal = {
    rtitek_thermostat_system_mode: {
        key: ['system_mode'],
        convertSet: async (entity, key, value, meta) => {
            const systemModeLookup = {'auto' : 0, 'fan_only' : 1, 'off' : 2, 'heat' : 3};
            await tuya.sendDataPointEnum(entity, tuyaLocal.dataPoints.rtitekSystemMode, systemModeLookup[value]);
        },
    },
    rtitek_thermostat_current_heating_setpoint: {
        key: ['current_heating_setpoint'],
        convertSet: async (entity, key, value, meta) => {
            const temp = Math.round(value * 10);
            await tuya.sendDataPointValue(entity, tuyaLocal.dataPoints.rtitekHeatingSetpoint, temp);
        },
    },

    rtitek_thermostat_window_detection: {
        key: ['window_detection'],
        convertSet: async (entity, key, value, meta) => {
            await tuya.sendDataPointBool(entity, tuyaLocal.dataPoints.rtitekWindowDetection, value === 'ON');
        },
    },

    rtitek_thermostat_child_lock: {
        key: ['child_lock'],
        convertSet: async (entity, key, value, meta) => {
            await tuya.sendDataPointBool(entity, tuyaLocal.dataPoints.rtitekChildLock, value === 'LOCK');
        },
    },

	rtitek_thermostat_min_temperature: {
        key: ['min_temperature'],
        convertSet: async (entity, key, value, meta) => {
            const temp = Math.round(value * 10);
            await tuya.sendDataPointValue(entity, tuyaLocal.dataPoints.rtitekMinTemp, temp);
        },
    },

    rtitek_thermostat_max_temperature: {
        key: ['max_temperature'],
        convertSet: async (entity, key, value, meta) => {
            const temp = Math.round(value * 10);
            await tuya.sendDataPointValue(entity, tuyaLocal.dataPoints.rtitekMaxTemp, temp);
        },
    },

    rtitek_thermostat_temperature_calibration: {
        key: ['local_temperature_calibration'],
        convertSet: async (entity, key, value, meta) => {
            var temp = Math.round(value * 10);
            if (temp < 0) {
                temp = 0xFFFFFFFF + temp + 1;
            }
            await tuya.sendDataPointValue(entity, tuyaLocal.rtitekTempCalibration, temp);
        },
    },

//    rtitek_thermostat_boost_heating: {
//        key: ['boost_heating'],
//        convertSet: async (entity, key, value, meta) => {
//            await tuya.sendDataPointBool(entity, tuyaLocal.dataPoints.rtitekBoostHeating, value === 'ON');
//        },
//    },

//    rtitek_thermostat_boost_heating_countdown: {
//       key: ['boost_heating_countdown'],
//        convertSet: async (entity, key, value, meta) => {
//            await tuya.sendDataPointValue(entity, tuyaLocal.dataPoints.rtitekBoostHeatingCountdown, value);
//        },
//    },
};

const definition = {
    fingerprint: [
        {modelID: 'TS0601', manufacturerName: '_TZE200_a4bpgplm'},
        {modelID: 'TS0601\u0000', manufacturerName: '_TZE200_a4bpgplm'},
    ],
    model: 'TRV601',
    vendor: 'Rti-Tek',
    description: 'Thermostatic radiator valve (TRV) from Rti-Tek',
    onEvent: tuya.onEventSetLocalTime,
    fromZigbee: [fz.ignore_basic_report, fz.ignore_tuya_set_time, fzLocal.rtitek_thermostat],
    toZigbee: [tzLocal.rtitek_thermostat_system_mode, tzLocal.rtitek_thermostat_current_heating_setpoint, 
		tzLocal.rtitek_thermostat_boost_heating, tzLocal.rtitek_thermostat_boost_heating_countdown, tzLocal.rtitek_thermostat_working_state,
        tzLocal.rtitek_thermostat_window_detection, tzLocal.rtitek_thermostat_child_lock, tzLocal.rtitek_thermostat_min_temperature,
        tzLocal.rtitek_thermostat_max_temperature, tzLocal.rtitek_thermostat_temperature_calibration],
    configure: async (device, coordinatorEndpoint, logger) => {
        const endpoint = device.getEndpoint(1);
        await reporting.bind(endpoint, coordinatorEndpoint, ['genBasic']);
    },
    exposes: [
        exposes.climate().withLocalTemperature(ea.STATE)
			.withSetpoint('current_heating_setpoint', 5, 35, 0.5, ea.STATE_SET)
			.withSystemMode(['auto', 'fan_only', 'off', 'heat'], ea.STATE_SET)
			.withRunningState(['idle', 'heat'], ea.STATE_SET)
            .withLocalTemperatureCalibration(ea.STATE_SET),
        e.max_temperature(),
		e.min_temperature(),
		exposes.composite('programming_mode').withDescription('Programming mode ⏱: In this mode, ' +
			'the device executes a preprogrammed daily schedule. Four temperatures and hours can be set for each day.')
			.withFeature(exposes.text('program_monday', ea.STATE))
			.withFeature(exposes.text('program_tuesday', ea.STATE))
			.withFeature(exposes.text('program_wednesday', ea.STATE))
			.withFeature(exposes.text('program_thursday', ea.STATE))
			.withFeature(exposes.text('program_friday', ea.STATE))
			.withFeature(exposes.text('program_saturday', ea.STATE))
			.withFeature(exposes.text('program_sunday', ea.STATE)),
		e.window_detection(),
		exposes.binary('window', ea.STATE, 'OPEN', 'CLOSED').withDescription('Window status closed or open '),
        e.child_lock(),
		exposes.text('fault_alarm', ea.STATE),// not sure what type, never seen one
		e.battery(),
		e.position(),
//        exposes.binary('boost_heating', ea.STATE_SET, 'ON', 'OFF').withDescription('Boost heating'),
//        exposes.numeric('boost_heating_countdown', ea.STATE_SET).withUnit('min').withDescription('Boost heating countdown in minutes'),
		exposes.numeric('software_version', ea.STATE),
    ],
};

module.exports = definition;