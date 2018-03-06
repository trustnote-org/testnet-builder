/*jslint node: true */
"use strict";

exports.clientName = 'TTT';
exports.minClientVersion = '1.1.0';
exports.WS_PROTOCOL = 'ws://';
// https://console.developers.google.com
exports.pushApiProjectNumber = 0;
exports.pushApiKey = '';

exports.port = 6616;
//exports.myUrl = 'wss://mydomain.com/bb';
exports.bServeAsHub = true;
exports.bSaveJointJson = true;
exports.bLight = false;

// this is used by wallet vendor only, to redirect bug reports to developers' email
exports.bug_sink_email = 'admin@example.org';
exports.bugs_from_email = 'bugs@example.org';

exports.HEARTBEAT_TIMEOUT = 300*1000;

exports.storage = 'sqlite';


exports.initial_witnesses = [
    '5SGHGVDCY4BO5DKNC5L2TOCAKFNATB5V',
    '5Y7QZSQNKYS5SJVXE47YGQ35FG5JJMXN',
    'AWIA2BFATICIWVVHVCU2N4WZXHP4CD7G',
    'BKRWK7HADRMDZF7IU3B7AYT4WXUWBFGT',
    'CLAGUVFRUSMDWLTIKD5X3BCEXYLG5FKH',
    'LWOUHPD6W27QIMB3S6MYHS7YOVCYFJAF',
    'N4ZBL7XC2TSWC6U6SB4E5V3PFR75MVSU',
    'NRLOKJI2QGVE4CFILL4AIDWXOIMNYQA7',
    'NT5WOZCCWYYKMXGAXKXEVJDYVXMHKHMX',
    'R62HF6RQFPC2NLZ5AWJUWSEQOWYDJGJV',
    'TCO4S66J6WL4JHGVDPTCDLXF6FHXVV5B',
    'WJ66AZLXSTPOZNHFBP4HCZYJ6HHY3FNI'
];

exports.initial_peers = [
];

console.log('finished hub conf');
