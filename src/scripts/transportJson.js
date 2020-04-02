const transportSchema = {
    "nodes": [
    {
        "name": "root",
        "decendants": {
            "children": [
                "sfmta"
            ]
        }
    },
    {
        "name": "sfmta",
        "type": "const",
        "value": "sfmta",
        "decendants": {
            "children": [
                "rapid-transit",
                "bus",
                "light-rail"
            ],
            "distribution": [0.35, 0.55, 0.1]
        }
    },

    {
        "name": "rt-train-numbers",
        "type": "enum",
        "value": ["5043", "8556", "3859", "1493", "7453", "1165", "2338", "6438", "7663", "8247", "3644", "0741", "4718", "3241", "4122", "3843", "8237", "6693", "5375",
            "2749", "1645", "1943", "0277", "5783"],
        "distribution": "equal"
    },
    {
        "name": "rt-station-names",
        "type": "enum",
        "value": ["glen park", "24th-mission", "civic-center", "powell", "montgomery", "embarcadero", "west-oakland", "lake-merritt", "castro",
            "church", "forest hill", "van ness", "west portal", "mission rock", "mariposa", "evans", "marin", "sf zoo", "taraval", "ocean beach"],
        "distribution": "equal"
    },

    {
        "name": "bus-numbers",
        "type": "enum",
        "value": ["E Embarcadero", "California Cable Car", "6 Haight-Parnassus", "8AX Bayshore A Express", "10 Townsend", "14 Mission",
            "23 Monterey", "25 Treasure Island", "30X Marina Express", "31AX Balboa A Express", "33 Ashbury-18th", "36 Teresita",
            "38AX Geary A Express", "43 Masonic", "45 Union-Stockton", "52 Excelsior", "67 Bernal Heights", "78X 16th Street Arena Express"],
        "distribution": "equal"
    },
    {
        "name": "bus-stop-ids",
        "type": "enum",
        "value": ["15240", "15237", "17145", "17795", "14503", "14515", "17281", "15253", "15836", "11524", "12634", "15264", "17754", "17748",
           "16775", "16468", "18535", "19452", "19774", "18846", "16911", "15754", "15438", "18731", "18957", "17488", "17427", "14378",
            "16399", "14328", "14631", "19583", "16484"],
        "distribution": "equal"
    },

    {
        "name": "light-rail-routes",
        "type": "enum",
        "value": ["Powell-Hyde", "California", "Embarcadera", "Mason"],
        "distribution": "equal"
    },
    {
        "name": "light-rail-stops",
        "type": "enum",
        "value": ["Beach", "Bay", "Francisco", "Chestnut", "Lombard", "Greenwich", "Filbert", "Union", "Green", "Vallejo", "Broadway", "Pacific", "Jackson", "Washington",
            "Leavenworth", "Powell", "Stockton", "Grant", "Kearny", "Montgomery", "Battery", "Front"],
        "distribution": "equal"
    },

    {
        "name": "rapid-transit",
        "value": "rapid-transit",
        "type": "const",
        "decendants": {
            "children": [
                "eta-update",
                "geo-loc-rt",
                "notice-rt",
                "alert-rt"
            ],
            "distribution": [0.55, 0.15, 0.06, 0.04]
        }
    },

    {
        "name": "eta-rt-version",
        "type": "enum",
        "value": [
            "v1",
            "v2"
        ],
        "distribution": [1, 6],
        "decendants": {
            "children": [
                "station-rt-name"
            ]
        }
    },

    {
        "name": "eta-update",
        "type": "const",
        "value": "eta-update",
        "decendants": {
            "children": [
                "eta-rt-version"
            ]
        }
    },
    {
        "name": "station-rt-name",
        "type": "custom",
        "value": "rt-station-names",
        "distribution": "equal",
        "decendants": {
            "children": [
                "rt-station-eta-train-num"
            ]
        }
    },

    {
        "name": "rt-station-eta-train-num",
        "type": "custom",
        "value": "rt-train-numbers",
        "decendants": {
            "children": [
                "rt-eta-time"
            ]
        }
    },
    {
        "name": "rt-eta-time",
        "type": "normal-int",
        "value": "4,8"
    },

    {
        "name": "geo-loc-rt-version-v1",
        "type": "const",
        "value": "v1",
        "decendants": {
            "children": [
                "rt-geo-train-num-geo-nochild"
            ]
        }
    },
    {
        "name": "geo-loc-rt-version-v2",
        "type": "const",
        "value": "v2",
        "decendants": {
            "children": [
                "rt-geo-train-num-geo"
            ]
        }
    },
    {
        "name": "geo-loc-rt",
        "type": "const",
        "value": "geo-update",
        "decendants": {
            "children": [
                "geo-loc-rt-version-v2",
                "geo-loc-rt-version-v1"
            ],
            "distribution": [0.65, 0.35],
        }
    },
    {
        "name": "rt-geo-train-num-geo",
        "type": "custom",
        "value": "rt-train-numbers",
        "decendants": {
            "children": [
                "rt-random-geo-lat"
            ]
        }
    },
    {
        "name": "rt-geo-train-num-geo-nochild",
        "type": "custom",
        "value": "rt-train-numbers"
    },
    {
        "name": "rt-random-geo-lat",
        "type": "random-long-3-4",
        "value": "37.6130,37.8300",
        "decendants": {
            "children": [
                "rt-random-geo-long"
            ]
        }
    },
    {
        "name": "rt-random-geo-long",
        "type": "random-long-3-4",
        "value": "-122.3790,-122.5120"
    },

    {
        "name": "notice-rt-version",
        "type": "const",
        "value": "v1",
        "decendants": {
            "children": [
                "rt-notice-train",
                "rt-notice-station"
            ],
            "distribution": [0.7, 0.3]
        }
    },

    {
        "name": "notice-rt",
        "type": "const",
        "value": "notice",
        "decendants": {
            "children": [
                "notice-rt-version"
            ]
        }
    },

    {
        "name": "rt-notice-train",
        "type": "const",
        "value": "train",
       "distribution": "equal",
        "decendants": {
            "children": [
                "rt-notice-train-reason"
            ]
        }
    },

    {
        "name": "rt-notice-train-reason",
        "type": "enum",
        "value": ["train-maintenance", "track-delay", "train-re-route"],
        "distribution": "equal",
        "decendants": {
            "children": [
                "rt-notice-train-num"
            ]
        }
    },

    {
        "name": "rt-notice-train-num",
        "type": "custom",
        "value": "rt-train-numbers",
       "distribution": "equal"
    },

    {
        "name": "rt-notice-station",
        "type": "const",
        "value": "station",
        "distribution": "equal",
        "decendants": {
            "children": [
                "rt-notice-station-reason"
            ]
        }
    },


    {
        "name": "rt-notice-station-reason",
        "type": "enum",
        "value": ["hvac-maintenance", "track-re-open", "track-maintenance", "track-closure", "escalator-maintenance", "elevator-maintenance"],
        "distribution": "normal",
        "decendants": {
            "children": [
                "rt-notice-station-reason-level"
            ]
        }
    },
    {
        "name": "rt-notice-station-reason-level",
        "type": "enum",
        "value": ["evaluating", "major-repair", "modernization", "planned", "preventative", "safety-inspection"],
        "distribution": "equal",
        "decendants": {
            "children": [
                "rt-notice-station-name"
            ]
        }
    },
    {
        "name": "rt-notice-station-name",
        "type": "custom",
        "value": "rt-station-names",
        "distribution": "equal"
    },

    {
        "name": "alert-rt-version",
        "type": "const",
        "value": "v2",
        "decendants": {
            "children": [
                "rt-alert-train",
                "rt-alert-station"
            ],
         "distribution": [0.4, 0.6]
        }
    },
   {
        "name": "alert-rt",
        "type": "const",
        "value": "alert",
        "decendants": {
            "children": [
                "alert-rt-version"
            ]
        }
    },

    {
        "name": "rt-alert-train",
        "type": "const",
        "value": "train",
        "decendants": {
            "children": [
                "rt-alert-train-reason"
            ]
        }
    },

    {
        "name": "rt-alert-train-num",
        "type": "custom",
        "value": "rt-train-numbers",
       "distribution": "equal"
    },

    {
        "name": "rt-alert-train-reason",
        "type": "enum",
        "value": ["route-cancelled"],
        "distribution": "equal",
        "decendants": {
            "children": [
                "rt-alert-train-num"
            ]
        }
    },

    {
        "name": "rt-alert-station",
        "type": "const",
        "value": "station",
        "decendants": {
            "children": [
                "rt-alert-station-reason"
            ]
        }
    },
    {
        "name": "rt-alert-station-reason",
        "type": "enum",
        "value": ["entrance-closure", "reduced-capacity", "station-maintenance"],
        "distribution": "equal",
        "decendants": {
            "children": [
                "rt-alert-station-name"
            ]
        }
    },

    {
        "name": "rt-alert-station-name",
        "type": "custom",
        "value": "rt-station-names",
        "distribution": "equal"
    },


    {
        "name": "bus",
        "type": "const",
        "value": "bus",
        "decendants": {
            "children": [
                "eta-bus",
                "geo-loc-rt",
                "notice-bus",
                "alert-bus"
            ],
            "distribution": [0.45, 0.25, 0.06, 0.04]
        }
    },

    {
        "name": "eta-bus",
        "type": "const",
        "value": "eta-update",
        "decendants": {
            "children": [
                "eta-bus-version"
            ]
        }
    },
    {
        "name": "eta-bus-version",
        "type": "const",
        "value": "v1",
        "decendants": {
            "children": [
                "eta-bus-stop-bus-num"
            ]
        }
    },

    {
        "name": "eta-bus-stop",
        "type": "custom",
        "value": "bus-stop-ids",
        "distribution": "equal",
        "decendants": {
            "children": [
                "eta-bus-stop-bus-num"
            ]
        }
    },

    {
        "name": "eta-bus-stop-bus-num",
        "type": "custom",
        "value": "bus-numbers",
        "decendants": {
            "children": [
                "bus-eta-time"
            ]
        }
    },
    {
        "name": "bus-eta-time",
        "type": "normal-int",
        "value": "8,10"
    },

    {
        "name": "notice-bus-version",
        "type": "const",
        "value": "v1",
        "decendants": {
            "children": [
                "bus-notice-bus",
                "bus-notice-stop"
            ],
            "distribution": [0.7, 0.3]
        }
    },
    {
        "name": "notice-bus",
        "type": "const",
        "value": "notice",
        "decendants": {
            "children": [
                "notice-bus-version",
            ]
        }
    },

    {
        "name": "bus-notice-bus",
        "type": "const",
        "value": "route",
       "distribution": "equal",
       "decendants": {
            "children": [
                "bus-notice-reason"
            ]
        }
    },
    {
        "name": "bus-notice-reason",
        "type": "enum",
        "value": ["mechanical-failure", "traffic-delay", "re-route", "specialty-pickup"],
        "distribution": "normal",
        "decendants": {
            "children": [
                "bus-notice-bus-num"
            ]
        }
    },
    {
        "name": "bus-notice-bus-num",
        "type": "custom",
        "value": "bus-numbers",
       "distribution": "equal"
    },

    {
        "name": "bus-notice-stop",
        "type": "const",
        "value": "stop",
        "decendants": {
            "children": [
                "bus-notice-stop-reason"
            ]
        }
    },

    {
        "name": "bus-notice-stop-reason",
        "type": "enum",
        "value": ["stop-maintenance"],
        "distribution": "equal",
        "decendants": {
            "children": [
                "bus-notice-stop-id"
            ]
        }    },
    {
        "name": "bus-notice-stop-id",
        "type": "custom",
        "value": "bus-stop-ids",
        "distribution": "equal"
    },


    {
        "name": "alert-bus-version",
        "type": "const",
        "value": "v1",
        "decendants": {
            "children": [
                "bus-alert-bus",
                "bus-alert-stop"
            ],
            "distribution": [0.4, 0.6]
        }
    },
    {
        "name": "alert-bus",
        "type": "const",
        "value": "alert",
        "decendants": {
            "children": [
                "alert-bus-version",
            ]
        }
    },

    {
        "name": "bus-alert-bus",
        "type": "const",
        "value": "vehicle",
        "decendants": {
            "children": [
                "bus-alert-bus-reason"
            ]
        }
    },
    {
        "name": "bus-alert-bus-reason",
        "type": "enum",
        "value": ["route-cancelled", "additional-buses-added"],
        "distribution": "equal",
        "decendants": {
            "children": [
                "bus-alert-bus-num"
            ]
        }
    },
    {
        "name": "bus-alert-bus-num",
        "type": "custom",
        "value": "bus-numbers",
       "distribution": "equal"
    },

    {
        "name": "bus-alert-stop",
        "type": "const",
        "value": "stop",
        "decendants": {
            "children": [
                "bus-alert-stop-reason"
            ]
        }
    },
    {
        "name": "bus-alert-stop-reason",
        "type": "enum",
        "value": ["stop-closure", "stop-maintenance"],
        "distribution": "equal",
        "decendants": {
            "children": [
                "bus-alert-stop-name"
            ]
        }
    },
    {
        "name": "bus-alert-stop-name",
        "type": "custom",
        "value": "bus-stop-ids",
        "distribution": "equal"
    },

    {
        "name": "light-rail",
        "type": "const",
        "value": "light-rail",
        "decendants": {
            "children": [
                "eta-light-rail",
                "geo-loc-rt",
                "notice-light-rail",
                "alert-light-rail"
            ],
            "distribution": [0.2, 0.3, 0.06, 0.04]
        }
    },

    {
        "name": "eta-light-rail",
        "type": "const",
        "value": "eta-update",
        "decendants": {
            "children": [
                "eta-light-rail-version"
            ]
        }
    },
    {
        "name": "eta-light-rail-version",
        "type": "const",
        "value": "v1",
        "decendants": {
            "children": [
                "eta-light-rail-stop"
            ]
        }
    },

    {
        "name": "eta-light-rail-stop",
        "type": "custom",
        "value": "light-rail-stops",
        "distribution": "equal",
        "decendants": {
            "children": [
                "eta-light-rail-stop-light-rail-route"
            ]
        }
    },

    {
        "name": "eta-light-rail-stop-light-rail-route",
        "type": "custom",
        "value": "light-rail-routes",
        "decendants": {
            "children": [
                "light-rail-eta-time"
            ]
        }
    },
    {
        "name": "light-rail-eta-time",
        "type": "normal-int",
        "value": "7,11"
    },


    {
        "name": "notice-light-rail",
        "type": "const",
        "value": "notice",
        "decendants": {
            "children": [
                "notice-light-rail-version"
            ]
        }
    },

    {
        "name": "notice-light-rail-version",
        "type": "const",
        "value": "v1",
       "distribution": "equal",
        "decendants": {
            "children": [
                "light-rail-notice-route",
                "light-rail-notice-stops"
            ],
            "distribution": [0.7, 0.3]
        }
    },

    {
        "name": "light-rail-notice-route",
        "type": "const",
        "value": "route",
       "distribution": "equal",
        "decendants": {
            "children": [
                "light-rail-notice-reason"
            ]
        }
    },
    {
        "name": "light-rail-notice-reason",
        "type": "enum",
        "value": ["mechanical-failure", "traffic-delay", "re-route", "specialty-pickup"],
        "distribution": "normal",
        "decendants": {
            "children": [
                "light-rail-notice-route-name"
            ]
        }
    },
    {
        "name": "light-rail-notice-route-name",
        "type": "custom",
        "value": "light-rail-routes",
       "distribution": "equal"
    },
    {
        "name": "light-rail-notice-stops",
        "type": "const",
        "value": "stop",
        "distribution": "equal",
        "decendants": {
            "children": [
                "light-rail-notice-stops-name"
            ]
        }
    },
    {
        "name": "light-rail-notice-stops-name",
        "type": "custom",
        "value": "light-rail-stops",
        "distribution": "equal",
        "decendants": {
            "children": [
                "light-rail-notice-stop-reason"
            ]
        }
    },
    {
        "name": "light-rail-notice-stop-reason",
        "type": "enum",
        "value": ["stop-maintenance"],
        "distribution": "equal"
    },


    {
        "name": "alert-light-rail",
        "type": "const",
        "value": "alert",
        "decendants": {
            "children": [
                "alert-light-rail-version"
            ]
        }
    },
    {
        "name": "alert-light-rail-version",
        "type": "const",
        "value": "v1",
        "decendants": {
            "children": [
                "alert-light-rail-route",
                "light-rail-alert-stop"
            ],
            "distribution": [0.4, 0.6]
        }
    },
    {
        "name": "alert-light-rail-route",
        "type": "const",
        "value": "route",
        "decendants": {
            "children": [
                "light-rail-alert-reason"
            ]
        }
    },
    {
        "name": "light-rail-alert-reason",
        "type": "enum",
        "value": ["route-cancelled", "additional-train-added"],
        "distribution": "equal",
        "decendants": {
            "children": [
                "light-rail-alert-light-rail-route"
            ]
        }
    },
    {
        "name": "light-rail-alert-light-rail-route",
        "type": "custom",
        "value": "light-rail-routes",
       "distribution": "equal"
    },
    
    {
        "name": "light-rail-alert-stop",
        "type": "const",
        "value": "stop",
        "decendants": {
            "children": [
                "light-rail-alert-stop-reason"
            ]
        }
    },
    {
        "name": "light-rail-alert-stop-reason",
        "type": "enum",
        "value": ["stop-closure", "stop-maintenance"],
        "distribution": "equal",
        "decendants": {
            "children": [
                "light-rail-alert-stop-name"
            ]
        }
    },
    {
        "name": "light-rail-alert-stop-name",
        "type": "custom",
        "value": "light-rail-stops",
        "distribution": "equal"
    }
]
};

export { transportSchema };