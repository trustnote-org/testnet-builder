/*jslint node: true */
"use strict";

exports.port = null;
//exports.myUrl = 'wss://mydomain.com/bb';
exports.bServeAsHub = false;
exports.bLight = false;

exports.webPort = 8080;

exports.storage = 'sqlite';


exports.initial_witnesses = [
        '33W273QG2Z3F6TMYTDGFZG3ETKZPG5G7',
        '4CQKRXPMH4HCXC4RB6R2DUHV2RZ2XCGE',
        '77OGV47LWHRPEMHW2CO77XIWUTJYGGUN',
        '7THHGJB2JW6UWYJUGNRX4GXBL4IP5YXF',
        'DXOQJKBLBT7AWQTKD64SZZ5RNZXXVLB6',
        'GHUSYNBMZDFPBH3YDAA3TH5LHYU3C2JX',
        'T4TBEYOLJMXIDFXDM7MLT7QO3E2ZLN3V',
        'VCPSKSESM2XOARXSFEF5EWFL3T4T5DFT',
        'VVMXCDZJK5FDYHIRFCBIMDTPIBLI5I32',
        'W5XZEYZYPYVH2XYSDAZ7IPISCYKKO2V6',
        'X5QJ6JA26DDKDJJF7CGMT64IX25R5M3T',
        'XE7RSUABVNPDIS5CM4KJTQ3ZRFP7WTFN'
];


/*'wss://trustnote.org/tg' */
exports.initial_peers = [
	'ws://127.0.0.1:6616'
];

console.log('finished explorer conf');
