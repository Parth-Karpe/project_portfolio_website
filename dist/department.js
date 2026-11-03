/* One CS AI department; local roster import and isolated per-team workspaces. */
const workspaceKeys=['members','guide','forms','repo','stage','unlocked','status1','status2','feedback','score','reviews','questions','answers','activities','messages','mentorMessages','media','questionStage','questionSnapshot','vivaSubmissions'];
const clone=x=>JSON.parse(JSON.stringify(x));
function newTeamWorkspace(team){const w=initial();Object.assign(w,{media:[],messages:[],mentorMessages:[],reviews:{},vivaRecords:[]});w.members=team.members.map((m,i)=>({...m,role:i===0?'Team Lead':'Team Member',github:'https://github.com',skills:'Add skills',contribution:'Add individual responsibilities'}));w.guide=team.faculty;w.forms[1]={title:team.title,problem:'',users:'',research:'',objectives:'',solution:'',success:'',evidence:''};w.forms[2]={functional:'',nonfunctional:'',architecture:'',implementation:'',testing:'',results:'',reflection:'',evidence:''};w.activities=[{text:'CS AI team workspace created',time:new Date().toLocaleString()}];const result={};workspaceKeys.forEach(k=>{if(w[k]!==undefined)result[k]=w[k]});return result}
function seedTeams(){
  return [
  {
    "id": "A-01",
    "faculty": "Ms.Jyothi Patil",
    "topic": "Theme 1: Data Storage and Retrieval Systems",
    "theme_no": 1,
    "theme_name": "Data Storage and Retrieval Systems",
    "title": "Mini RDBMS Engine with Query Processing & Transaction Support",
    "members": [
      {
        "name": "Bhoomi B",
        "usn": "01FE24BCI044"
      },
      {
        "name": "Sneha S",
        "usn": "01FE24BCI061"
      },
      {
        "name": "Soumya P",
        "usn": "01FE24BCI005"
      },
      {
        "name": "Shubham M",
        "usn": "01FE24BCI083"
      }
    ],
    "sample": true,
    "excel_order": 1
  },
  {
    "id": "B-04",
    "faculty": "Ms.Umadevi F M",
    "topic": "Theme 1: Data Storage and Retrieval Systems",
    "theme_no": 1,
    "theme_name": "Data Storage and Retrieval Systems",
    "title": "Multi-Process Search Engine with Persistent Index",
    "members": [
      {
        "name": "Aditya Gavimath",
        "usn": "01FE24BCI120"
      },
      {
        "name": "Arun Hadimani",
        "usn": "01FE24BCI106"
      },
      {
        "name": "Kartik Hegde",
        "usn": "01FE24BCI107"
      },
      {
        "name": "Prajwal B",
        "usn": "01FE25BCI701"
      }
    ],
    "sample": true,
    "excel_order": 2
  },
  {
    "id": "B-05",
    "faculty": "Ms.Shrushti Gani",
    "topic": "Theme 1: Data Storage and Retrieval Systems",
    "theme_no": 1,
    "theme_name": "Data Storage and Retrieval Systems",
    "title": "Persistent Key-Value Storage Engine",
    "members": [
      {
        "name": "Keerthana K",
        "usn": "01FE24BCI118"
      },
      {
        "name": "Sukanya",
        "usn": "01FE24BCI108"
      },
      {
        "name": "Pooja",
        "usn": "01FE24BCI105"
      },
      {
        "name": "Sakshi",
        "usn": "01FE24BCI109"
      }
    ],
    "sample": true,
    "excel_order": 3
  },
  {
    "id": "A-17",
    "faculty": "Ms.Pooja P Shettar",
    "topic": "Theme 1: Data Storage and Retrieval Systems",
    "theme_no": 1,
    "theme_name": "Data Storage and Retrieval Systems",
    "title": "Distributed File Metadata & Access Management Engine",
    "members": [
      {
        "name": "Rohan Baddur",
        "usn": "01FE24BCI047"
      },
      {
        "name": "Adarsh Benawadi",
        "usn": "01FE24BCI063"
      },
      {
        "name": "Sandesh Tonni",
        "usn": "01FE24BCI048"
      }
    ],
    "sample": true,
    "excel_order": 4
  },
  {
    "id": "A-08",
    "faculty": "Ms.Sneha Varur",
    "topic": "Theme 2: Data Processing and Analytics Systems",
    "theme_no": 2,
    "theme_name": "Data Processing and Analytics Systems",
    "title": "Large-Scale Dataset Profiling & Data Quality Engine",
    "members": [
      {
        "name": "Anupriya S",
        "usn": "01FE24BCI046"
      },
      {
        "name": "Pavitra J",
        "usn": "01FE24BCI049"
      },
      {
        "name": "Anushree A",
        "usn": "01FE24BCI050"
      },
      {
        "name": "Sahana A",
        "usn": "01FE24BCI030"
      }
    ],
    "sample": true,
    "excel_order": 5
  },
  {
    "id": "A-09",
    "faculty": "Ms.Sneha Varur",
    "topic": "Theme 2: Data Processing and Analytics Systems",
    "theme_no": 2,
    "theme_name": "Data Processing and Analytics Systems",
    "title": "Multi-Source Data Integration & Entity Resolution Engine",
    "members": [
      {
        "name": "Varsha K",
        "usn": "01FE24BCI082"
      },
      {
        "name": "Gayathri Davara",
        "usn": "01FE24BCI068"
      },
      {
        "name": "Krupa Akki",
        "usn": "01FE24BCI057"
      },
      {
        "name": "Srushti Shetti",
        "usn": "01FE24BCI002"
      }
    ],
    "sample": true,
    "excel_order": 6
  },
  {
    "id": "A-13",
    "faculty": "Ms.Umadevi F M",
    "topic": "Theme 2: Data Processing and Analytics Systems",
    "theme_no": 2,
    "theme_name": "Data Processing and Analytics Systems",
    "title": "Distributed Event Processing & Notification Engine",
    "members": [
      {
        "name": "Avinash B Z",
        "usn": "01FE24BCI045"
      },
      {
        "name": "Sagar B U",
        "usn": "01FE24BCI054"
      },
      {
        "name": "Ramesh S K",
        "usn": "01FE24BCI039"
      },
      {
        "name": "ABHINANDAN",
        "usn": "01FE24BCI052"
      }
    ],
    "sample": true,
    "excel_order": 7
  },
  {
    "id": "B-10",
    "faculty": "Ms.Umadevi F M",
    "topic": "Theme 2: Data Processing and Analytics Systems",
    "theme_no": 2,
    "theme_name": "Data Processing and Analytics Systems",
    "title": "Large-Scale Log Processing & Analytics Engine",
    "members": [
      {
        "name": "Ananya Bhat",
        "usn": "01FE24BCI117"
      },
      {
        "name": "Priya Kshirsagar",
        "usn": "01FE24BCI110"
      },
      {
        "name": "Gurusiddeshwar N",
        "usn": "01FE25BCI710"
      },
      {
        "name": "Amit K",
        "usn": "01FE24BCI090"
      }
    ],
    "sample": true,
    "excel_order": 8
  },
  {
    "id": "A-10",
    "faculty": "Mr.Dheerajkumar",
    "topic": "Theme 3: System Software and Development Tools",
    "theme_no": 3,
    "theme_name": "System Software and Development Tools",
    "title": "Dependency-Aware Parallel Build System",
    "members": [
      {
        "name": "Prathamesh Eedigi",
        "usn": "01FE24BCI006"
      },
      {
        "name": "Sunayana Kamat",
        "usn": "01FE24BCI073"
      },
      {
        "name": "Jaideep",
        "usn": "01FE24BCI084"
      },
      {
        "name": "Nilaksha",
        "usn": "01FE24BCI087"
      }
    ],
    "sample": true,
    "excel_order": 9
  },
  {
    "id": "A-02",
    "faculty": "Ms.N D Kulenavar",
    "topic": "Theme 3: System Software and Development Tools",
    "theme_no": 3,
    "theme_name": "System Software and Development Tools",
    "title": "C Language Compiler & Code Generation Engine",
    "members": [
      {
        "name": "Vaishnavi K",
        "usn": "01FE24BCI051"
      },
      {
        "name": "Shreenidhi D",
        "usn": "01FE24BCI042"
      },
      {
        "name": "Suhas K",
        "usn": "01FE24BCI019"
      },
      {
        "name": "Sanket  Y U",
        "usn": "01FE24BCI037"
      }
    ],
    "sample": true,
    "excel_order": 10
  },
  {
    "id": "A-14",
    "faculty": "Ms.Arundati Aralimatti",
    "topic": "Theme 3: System Software and Development Tools",
    "theme_no": 3,
    "theme_name": "System Software and Development Tools",
    "title": "Mini Kernel with Process, Memory & File Management",
    "members": [
      {
        "name": "BHAVANA",
        "usn": "01FE24BCI036"
      },
      {
        "name": "ZAKIYA",
        "usn": "01FE24BCI038"
      },
      {
        "name": "PRADEEP",
        "usn": "01FE24BCI040"
      },
      {
        "name": "VIKITA R",
        "usn": "01FE24BCI055"
      }
    ],
    "sample": true,
    "excel_order": 11
  },
  {
    "id": "B-01",
    "faculty": "Mr.Dheerajkumar",
    "topic": "Theme 3: System Software and Development Tools",
    "theme_no": 3,
    "theme_name": "System Software and Development Tools",
    "title": "Incremental Build & Dependency Resolution Tool",
    "members": [
      {
        "name": "Sankalp Patil",
        "usn": "01FE24BCI095"
      },
      {
        "name": "Sai Jarkiholi",
        "usn": "01FE24BCI014"
      },
      {
        "name": "Pranav Naik",
        "usn": "01FE24BCI100"
      },
      {
        "name": "Abdul Khadar I",
        "usn": "01FE24BCI102"
      }
    ],
    "sample": true,
    "excel_order": 12
  },
  {
    "id": "B-07",
    "faculty": "Ms.N D Kulenavar",
    "topic": "Theme 3: System Software and Development Tools",
    "theme_no": 3,
    "theme_name": "System Software and Development Tools",
    "title": "Java Compiler & Bytecode Generation Engine",
    "members": [
      {
        "name": "Chaitanya",
        "usn": "01FE24BCI098"
      },
      {
        "name": "Soumya",
        "usn": "01FE24BCI121"
      },
      {
        "name": "Chaitra",
        "usn": "01FE25BCI706"
      },
      {
        "name": "Shridevi",
        "usn": "01FE24BCI103"
      }
    ],
    "sample": true,
    "excel_order": 13
  },
  {
    "id": "A-05",
    "faculty": "Ms.Sadaf Anjum Savanu",
    "topic": "Theme 4: Networked Systems and Tools",
    "theme_no": 4,
    "theme_name": "Networked Systems and Tools",
    "title": "Distributed Peer Search & File Sharing Engine",
    "members": [
      {
        "name": "Mudit J Nayak",
        "usn": "01FE24BCI076"
      },
      {
        "name": "Anusha Hebasur",
        "usn": "01FE24BCI009"
      },
      {
        "name": "Kartik NHM",
        "usn": "01FE24BCI072"
      },
      {
        "name": "Aditya Patil",
        "usn": "01FE24BCI059"
      }
    ],
    "sample": true,
    "excel_order": 14
  },
  {
    "id": "A-07",
    "faculty": "Ms.Pooja P Shettar",
    "topic": "Theme 4: Networked Systems and Tools",
    "theme_no": 4,
    "theme_name": "Networked Systems and Tools",
    "title": "Network Traffic Monitoring & Protocol Analysis Tool",
    "members": [
      {
        "name": "Chhavi Mishra",
        "usn": "01FE24BCI066"
      },
      {
        "name": "Hrishikesh Patil",
        "usn": "01FE24BCI043"
      },
      {
        "name": "Vaibhav P",
        "usn": "01FE24BCI074"
      },
      {
        "name": "M Janaki",
        "usn": "01FE24BCI067"
      }
    ],
    "sample": true,
    "excel_order": 15
  },
  {
    "id": "B-11",
    "faculty": "Mr.Pavankumar Saunshi",
    "topic": "Theme 4: Networked Systems and Tools",
    "theme_no": 4,
    "theme_name": "Networked Systems and Tools",
    "title": "DNS Resolver & Caching Server",
    "members": [
      {
        "name": "Vageesh Mathad",
        "usn": "01FE24BCI008"
      },
      {
        "name": "Mehak sayed Yusuf",
        "usn": "01FE24BCI012"
      },
      {
        "name": "Joel Biju",
        "usn": "01FE24BCI021"
      }
    ],
    "sample": true,
    "excel_order": 16
  },
  {
    "id": "B-12",
    "faculty": "Ms.Sadaf Anjum Savanur",
    "topic": "Theme 4: Networked Systems and Tools",
    "theme_no": 4,
    "theme_name": "Networked Systems and Tools",
    "title": "HTTP Proxy Server with Caching",
    "members": [
      {
        "name": "Adarsh MR",
        "usn": "01FE24BCI011"
      },
      {
        "name": "Krish Janagekar",
        "usn": "01FE24BCI097"
      },
      {
        "name": "Vivek Raikar",
        "usn": "01FE25BCI704"
      },
      {
        "name": "Akash",
        "usn": "01FE24BCI123"
      }
    ],
    "sample": true,
    "excel_order": 17
  },
  {
    "id": "B-13",
    "faculty": "Ms.Pooja P Shettar",
    "topic": "Theme 4: Networked Systems and Tools",
    "theme_no": 4,
    "theme_name": "Networked Systems and Tools",
    "title": "Resilient Multi-Peer File Distribution & Recovery Engine",
    "members": [
      {
        "name": "Vineet",
        "usn": "01FE24BCI093"
      },
      {
        "name": "Manasa",
        "usn": "01FE24BCI113"
      },
      {
        "name": "Mahadev P",
        "usn": "01FE24BCI116"
      },
      {
        "name": "Arihant A N",
        "usn": "01FE24BCI092"
      }
    ],
    "sample": true,
    "excel_order": 18
  },
  {
    "id": "B-14",
    "faculty": "Mr.Amit Kachavimath",
    "topic": "Theme 4: Networked Systems and Tools",
    "theme_no": 4,
    "theme_name": "Networked Systems and Tools",
    "title": "Adaptive Video Streaming & Buffer Management Engine",
    "members": [
      {
        "name": "Renuka",
        "usn": "01FE24BCI119"
      },
      {
        "name": "Divya",
        "usn": "01FE24BCI094"
      },
      {
        "name": "B Bhagyashree",
        "usn": "01FE24BCI104"
      },
      {
        "name": "Akshay Bhat",
        "usn": "01FE24BCI024"
      }
    ],
    "sample": true,
    "excel_order": 19
  },
  {
    "id": "A-06",
    "faculty": "Mr.Mallikarjun Akki",
    "topic": "Theme 5: Algorithmic and Optimization Systems",
    "theme_no": 5,
    "theme_name": "Algorithmic and Optimization Systems",
    "title": "Constraint-Based Academic Timetable Scheduling Engine",
    "members": [
      {
        "name": "Srujana patil",
        "usn": "01FE24BCI020"
      },
      {
        "name": "Yash Raj",
        "usn": "01FE24BCI064"
      },
      {
        "name": "Yashwanth Reddy",
        "usn": "01FE24BCI010"
      },
      {
        "name": "Abhinav Raj",
        "usn": "01FE24BCI058"
      }
    ],
    "sample": true,
    "excel_order": 20
  },
  {
    "id": "A-04",
    "faculty": "Mr.Maheshgouda Patil",
    "topic": "Theme 5: Algorithmic and Optimization Systems",
    "theme_no": 5,
    "theme_name": "Algorithmic and Optimization Systems",
    "title": "Resource Packing & Allocation Optimization Engine",
    "members": [
      {
        "name": "Sumanth Patil",
        "usn": "01FE24BCI085"
      },
      {
        "name": "Neil Mascarenhas",
        "usn": "01FE24BCI070"
      },
      {
        "name": "Dasari Joshua",
        "usn": "01FE24BCI078"
      },
      {
        "name": "Akash Dani",
        "usn": "01FE24BCI081"
      }
    ],
    "sample": true,
    "excel_order": 21
  },
  {
    "id": "B-03",
    "faculty": "Mr.Mallikarjun Akki",
    "topic": "Theme 5: Algorithmic and Optimization Systems",
    "theme_no": 5,
    "theme_name": "Algorithmic and Optimization Systems",
    "title": "Route Planning & Network Optimization Engine",
    "members": [
      {
        "name": "Ankush",
        "usn": "01FE24BCI096"
      },
      {
        "name": "Shrikar",
        "usn": "01FE24BCI013"
      },
      {
        "name": "P Sai sri ram",
        "usn": "01FE24BCI033"
      },
      {
        "name": "Shreya u",
        "usn": "01FE24BCI032"
      }
    ],
    "sample": true,
    "excel_order": 22
  },
  {
    "id": "B-06",
    "faculty": "Mr.Pavankumar Saunshi",
    "topic": "Theme 5: Algorithmic and Optimization Systems",
    "theme_no": 5,
    "theme_name": "Algorithmic and Optimization Systems",
    "title": "Dynamic Task Assignment & Scheduling Engine",
    "members": [
      {
        "name": "Alsaba A",
        "usn": "01FE25BCI705"
      },
      {
        "name": "Rakshita K",
        "usn": "01FE25BCI708"
      },
      {
        "name": "Omkar M",
        "usn": "01FE25BCI703"
      },
      {
        "name": "Harsh H",
        "usn": "01FE25BCI707"
      }
    ],
    "sample": true,
    "excel_order": 23
  },
  {
    "id": "A-03",
    "faculty": "Mr.Amit Kachavimath",
    "topic": "Theme 6: Concurrent and Transactional Systems",
    "theme_no": 6,
    "theme_name": "Concurrent and Transactional Systems",
    "title": "Smart Campus Lab & Resource Optimizer",
    "members": [
      {
        "name": "Vedant Khot",
        "usn": "01FE24BCI028"
      },
      {
        "name": "Nupur Bagave",
        "usn": "01FE24BCI029"
      },
      {
        "name": "Parth Karpe",
        "usn": "01FE24BCI062"
      },
      {
        "name": "Sachi Aratti",
        "usn": "01FE24BCI003"
      }
    ],
    "sample": false,
    "excel_order": 24
  },
  {
    "id": "A-11",
    "faculty": "Ms.Pooja P Shettar",
    "topic": "Theme 6: Concurrent and Transactional Systems",
    "theme_no": 6,
    "theme_name": "Concurrent and Transactional Systems",
    "title": "Distributed Job Queue & Task Processing Engine",
    "members": [
      {
        "name": "Adarsh W",
        "usn": "01FE24BCI071"
      },
      {
        "name": "Mansi D",
        "usn": "01FE24BCI115"
      },
      {
        "name": "Shravya A",
        "usn": "01FE24BCI001"
      },
      {
        "name": "Tanamayee K",
        "usn": "01FE24BCI007"
      }
    ],
    "sample": true,
    "excel_order": 25
  },
  {
    "id": "A-12",
    "faculty": "Ms.Sneha Varur",
    "topic": "Theme 6: Concurrent and Transactional Systems",
    "theme_no": 6,
    "theme_name": "Concurrent and Transactional Systems",
    "title": "Concurrent Booking & Resource Allocation Engine",
    "members": [
      {
        "name": "Akshata Patil",
        "usn": "01FE24BCI088"
      },
      {
        "name": "Srujana B",
        "usn": "01FE24BCI041"
      },
      {
        "name": "Mythri Gaded",
        "usn": "01FE24BCI031"
      },
      {
        "name": "Vandana A M",
        "usn": "01FE24BCI075"
      }
    ],
    "sample": true,
    "excel_order": 26
  },
  {
    "id": "A-15",
    "faculty": "Ms.Soumya Patil",
    "topic": "Theme 6: Concurrent and Transactional Systems",
    "theme_no": 6,
    "theme_name": "Concurrent and Transactional Systems",
    "title": "Concurrent Service Request & Dispatch Engine",
    "members": [
      {
        "name": "Monika M B",
        "usn": "01FE24BCI035"
      },
      {
        "name": "Akshatha M",
        "usn": "01FE24BCI080"
      },
      {
        "name": "Kalavva  MANVI",
        "usn": "01FE24BCI056"
      },
      {
        "name": "Abhishek N",
        "usn": "01FE23BCI112"
      }
    ],
    "sample": true,
    "excel_order": 27
  },
  {
    "id": "A-16",
    "faculty": "Ms.N D Kulenavar",
    "topic": "Theme 6: Concurrent and Transactional Systems",
    "theme_no": 6,
    "theme_name": "Concurrent and Transactional Systems",
    "title": "Multi-User Resource Reservation & Scheduling Engine",
    "members": [
      {
        "name": "Vishal p k",
        "usn": "01FE24BCI060"
      },
      {
        "name": "Vinayak s k",
        "usn": "01FE24BCI086"
      },
      {
        "name": "Manoj b kamath",
        "usn": "01FE24BCI077"
      },
      {
        "name": "Sushilendra E",
        "usn": "01FE24BCI053"
      }
    ],
    "sample": true,
    "excel_order": 28
  },
  {
    "id": "A-18",
    "faculty": "Ms.Umadevi F M",
    "topic": "Theme 6: Concurrent and Transactional Systems",
    "theme_no": 6,
    "theme_name": "Concurrent and Transactional Systems",
    "title": "Concurrent Helpdesk Ticketing & Service Dispatch System",
    "members": [
      {
        "name": "Shifa",
        "usn": "01FE24BCI004"
      },
      {
        "name": "Bhakti",
        "usn": "01FE24BCU079"
      },
      {
        "name": "Chinmayee",
        "usn": "NONE"
      },
      {
        "name": "Vinay",
        "usn": "NONE"
      }
    ],
    "sample": true,
    "excel_order": 29
  },
  {
    "id": "B-02",
    "faculty": "Ms.Sneha Varur",
    "topic": "Theme 6: Concurrent and Transactional Systems",
    "theme_no": 6,
    "theme_name": "Concurrent and Transactional Systems",
    "title": "Transaction-Safe Multi-User Booking & Waitlist Engine",
    "members": [
      {
        "name": "Abhinandan Patil",
        "usn": "01FE24BCI034"
      },
      {
        "name": "Preetam N G",
        "usn": "01FE24BCI018"
      },
      {
        "name": "Chanabasappa Metgud",
        "usn": "01FE24BCI027"
      },
      {
        "name": "Sai Aaryan Muktineni",
        "usn": "01FE24BCI025"
      }
    ],
    "sample": true,
    "excel_order": 30
  },
  {
    "id": "B-08",
    "faculty": "Ms.Soumya Patil",
    "topic": "Theme 6: Concurrent and Transactional Systems",
    "theme_no": 6,
    "theme_name": "Concurrent and Transactional Systems",
    "title": "Concurrent Service Request & Dispatch Engine",
    "members": [
      {
        "name": "Chirag Salecha",
        "usn": "01FE24BCI089"
      },
      {
        "name": "Achyuth RH",
        "usn": "01FE24BCI091"
      },
      {
        "name": "Abhijit RH",
        "usn": "01FE25BCI709"
      },
      {
        "name": "Sagar PM",
        "usn": "01FE25BCI712"
      }
    ],
    "sample": true,
    "excel_order": 31
  },
  {
    "id": "B-09",
    "faculty": "Ms.N D Kulenavar",
    "topic": "Theme 6: Concurrent and Transactional Systems",
    "theme_no": 6,
    "theme_name": "Concurrent and Transactional Systems",
    "title": "Multi-User Resource Reservation & Scheduling Engine",
    "members": [
      {
        "name": "Jayapal Mukre",
        "usn": "01FE24BCI022"
      },
      {
        "name": "Amogh Loni",
        "usn": "01FE24BCI017"
      },
      {
        "name": "Sammed Patil",
        "usn": "01FE24BCI102"
      },
      {
        "name": "Humera",
        "usn": "01FE24BCI114"
      }
    ],
    "sample": true,
    "excel_order": 32
  },
  {
    "id": "B-15",
    "faculty": "Ms. Soumya Patil",
    "topic": "Theme 6: Concurrent and Transactional Systems",
    "theme_no": 6,
    "theme_name": "Concurrent and Transactional Systems",
    "title": "Concurrent Service Request and Dispatch Engine",
    "members": [
      {
        "name": "Rohit",
        "usn": "01FE23BCI084"
      },
      {
        "name": "Suryakant",
        "usn": "01FE23BCI046"
      },
      {
        "name": "Saif Ali",
        "usn": "01FE23BCI008"
      },
      {
        "name": "Pranav T",
        "usn": "01FE23BCI004"
      }
    ],
    "sample": true,
    "excel_order": 33
  }
];
}
function ensureDepartment(){
  if(['Faculty Review','Discussion'].includes(page))page='Department';
  if(!state.department){state.department={name:'CS AI',hod:'CS AI HOD (demo)',facultyAdmin:'CS AI Faculty Admin (demo)'}}
  const seeds=seedTeams();
  if(!state.teams||state.teams.length<33||state.excelVersion!==3){
    state.teams=seeds;
    state.excelVersion=3;
    state.activeTeamId=state.teams.some(t=>t.id===state.activeTeamId)?state.activeTeamId:'A-03';
    state.workspaces=state.workspaces||{};
    state.facultyAccount=state.facultyAccount||'Mr.Amit Kachavimath';
    state.teams.forEach(t=>{
      t.department='CS AI';t.hod=state.department.hod;t.facultyAdmin=state.department.facultyAdmin;
      if(!state.workspaces[t.id])state.workspaces[t.id]=newTeamWorkspace(t);
    });
  }
  state.version=3;
  if(state.members) state.members.forEach(m=>delete m.share);
  state.facultyDirectory=state.facultyDirectory||[];
  [state,...Object.values(state.workspaces||{})].forEach(w=>{w.media=w.media||[];w.messages=w.messages||[];w.mentorMessages=w.mentorMessages||[];w.reviews=w.reviews||{};w.questions=w.questions||[];w.answers=w.answers||{};w.activities=w.activities||[]});
}
ensureDepartment();
function activeTeam(){return state.teams.find(t=>t.id===state.activeTeamId)}
function syncTeam(){const team=activeTeam();if(!team)return;team.members=state.members.map(m=>({name:m.name,usn:m.usn}));team.title=state.forms[1].title;team.faculty=state.guide;const w={};workspaceKeys.forEach(k=>{if(state[k]!==undefined)w[k]=clone(state[k])});state.workspaces[team.id]=w}
const saveLocalState=save;
save=function(){ensureDepartment();syncTeam();return saveLocalState()};
function facultyNames(){return [...new Set([...state.teams.map(t=>t.faculty),...state.facultyDirectory.map(f=>f.name)])].sort()}
function visibleTeams(){return state.role==='Faculty'?state.teams.filter(t=>t.faculty===state.facultyAccount):state.role==='Team Lead'?state.teams.filter(t=>t.id===state.activeTeamId):state.teams}
function switchTeam(id){const next=state.teams.find(t=>t.id===id);if(!next||state.role==='Faculty'&&next.faculty!==state.facultyAccount)return toast('This team is not assigned to the selected faculty account.');save();const w=state.workspaces[id]||newTeamWorkspace(next);workspaceKeys.forEach(k=>delete state[k]);Object.assign(state,clone(w));state.activeTeamId=id;state.guide=next.faculty;state.members=state.members.map((m,i)=>({...m,name:next.members[i].name,usn:next.members[i].usn}));state.forms[1].title=next.title;selectedSection='';modal=null;save();render();window.scrollTo(0,0)}
rolePages['Faculty Admin']=['Overview','Department','Team Portfolio','Design Journey'];
iconFor['Faculty Admin']='♙';
currentIdentity=function(){if(state.role==='Faculty Admin')return state.department.facultyAdmin;if(state.role==='Faculty')return state.facultyAccount;if(state.role==='HOD')return state.department.hod;if(state.role==='Admin')return 'CS AI Administrator';return state.members[0].name};
const changeRole=switchRole;
switchRole=function(role){changeRole(role);if(role==='Faculty'){if(!facultyNames().includes(state.facultyAccount))state.facultyAccount=facultyNames()[0];const t=state.teams.find(t=>t.faculty===state.facultyAccount);if(t&&t.id!==state.activeTeamId)switchTeam(t.id)}save();render()};
function selectFaculty(name){if(state.role!=='Faculty'||!facultyNames().includes(name))return;state.facultyAccount=name;const t=state.teams.find(t=>t.faculty===name);if(t)switchTeam(t.id);else{page='Overview';save();render()}}
const actualDecide=decide;
decide=function(approve){if(state.role!=='Faculty'||activeTeam()?.faculty!==state.facultyAccount)return toast('Only the assigned faculty guide can review this team.');actualDecide(approve)};
const decideSend=sendDiscussion;
sendDiscussion=function(){if(state.role==='Faculty'&&activeTeam()?.faculty!==state.facultyAccount)return;decideSend()};
function accountStrip(){
  if(state.role==='HOD'||page==='Department') return '';const available=state.role==='Faculty'?visibleTeams():state.teams;return `<div class="account-strip"><div><span class="tag">CS AI</span> <span class="mini">HOD: <strong>${esc(state.department.hod)}</strong> &nbsp;·&nbsp; Faculty Admin: <strong>${esc(state.department.facultyAdmin)}</strong></span></div><div class="account-controls">${state.role==='Faculty'?`<label for="faculty-account">Demo faculty account</label><select id="faculty-account" onchange="selectFaculty(this.value)">${facultyNames().map(n=>`<option ${n===state.facultyAccount?'selected':''}>${esc(n)}</option>`).join('')}</select>`:''}<label for="team-account">${state.role==='Team Lead'?'Demo team account':'Active team'}</label><select id="team-account" onchange="switchTeam(this.value)">${available.map(t=>`<option value="${esc(t.id)}" ${t.id===state.activeTeamId?'selected':''}>Team ${esc(t.id)} · ${esc(t.members[0].name)}</option>`).join('')}</select></div></div>`}
const renderWorkspace=render;
render=function(){ensureDepartment();if(page==='Faculty Admin')page='Overview';renderWorkspace();const main=$('.main');if(state.role==='Faculty'&&!visibleTeams().length){main.innerHTML=accountStrip()+heading('No teams assigned','This faculty account has no team allocation. Ask Admin or Faculty Admin to allocate a guide.');return}let html=main.innerHTML;if(['Design Journey'].includes(page)||page==='Overview'&&['Team Lead','Faculty'].includes(state.role))html=html.replaceAll('Team 03','Team '+esc(state.activeTeamId)).replaceAll('TEAM 03','TEAM '+esc(state.activeTeamId));html=html.replace('Intelligent Systems & Optimization · Faculty guide:',esc(activeTeam().topic)+' · Faculty guide:').replace('INTELLIGENT SYSTEMS & OPTIMIZATION',esc(activeTeam().topic.toUpperCase()));main.innerHTML=html;if(state.role!=='HOD'&&page!=='Department') main.insertAdjacentHTML('afterbegin',accountStrip());const f=$('#stageform');if(f){f.onsubmit=e=>{e.preventDefault();saveStage(true)};f.oninput=()=>{if(editableStage()){for(const[k,v]of new FormData(f))state.forms[state.stage][k]=v;if(save())$('#savehint').textContent='✓ Draft saved locally · '+new Date().toLocaleTimeString()}}}if(['Design Journey','Evidence Library'].includes(page))hydrateMedia()};
const teamOverview=overview;
overview=function(){if(state.role==='Faculty Admin')return facultyAdminPanel();return teamOverview()};
function getDomainKnowledge(t){
  const topic=(t.topic||'').toLowerCase(),title=(t.title||'').toLowerCase();
  if(topic.includes('vision')||topic.includes('health')||title.includes('disease')||title.includes('retinopathy')||title.includes('surgical')){
    return {
      problem:'Early clinical disease detection and surgical feature identification suffer from diagnostic subjectivity, inter-observer variability, and significant processing delays in resource-constrained medical environments.',
      targetUsers:'Consulting Radiologists, Agricultural Extension Officers, and Clinical Surgeons.',
      baselineFriction:'Manual visual inspection requires 15+ minutes per case with up to 18% false-negative diagnostic rates.',
      objectives:'Build an automated vision inference model achieving >= 90% macro F1; generate real-time Grad-CAM saliency heatmaps; deliver edge inference in under 800ms.',
      success1:'Diagnostic Accuracy: >= 90% Macro F1 on held-out multi-class test sets.',
      success2:'Inference Latency: Sub-800ms per high-resolution frame on edge hardware.',
      uc1:'Upload Clinical Scans & Field Images',uc2:'Execute Vision Transformer / CNN Pipeline',uc3:'Generate Explainable Grad-CAM Heatmap',uc4:'Review & Verify Diagnostic Predictions',
      fr1:'FR-01: Multi-Format Image Ingestion (DICOM, JPG, PNG) with automatic normalization and artifact reduction.',
      fr2:'FR-02: Deep Neural Network Classifier (Vision Transformer / Compact CNN) with multi-label confidence scores.',
      fr3:'FR-03: Saliency Heatmap Generation via Grad-CAM to highlight localized pathological regions.',
      fr4:'FR-04: Automated Diagnostic PDF and Structured JSON Report Generation for clinician validation.',
      nfr1:'NFR-01: Inference Speed < 800ms on edge GPU accelerators.',
      nfr2:'NFR-02: Generalization: >= 88% accuracy across unseen acquisition devices.',
      nfr3:'NFR-03: Privacy: HIPAA/GDPR-compliant zero-cloud client-side execution.',
      nfr4:'NFR-04: Resilience: Rejection of corrupted, over-exposed or blurry inputs.',
      archDesc:'Client Image Uploader → Preprocessing Engine → Vision Transformer Backbone → Saliency Visualizer → Local Diagnostic Database.',
      workflow:['Image Upload','Preprocessing','Neural Inference','Heatmap Generation','Diagnostic Report'],
      techGroup2:['PyTorch 2.2','Vision Transformers (ViT)','MobileNetV3','OpenCV / Albumentations'],
      implDesc:'Transfer learning on pre-trained ViT-B/16 with cross-entropy loss and focal loss for class imbalance. Grad-CAM layers hooked to final convolutional block.',
      hard1Name:'Loss Convergence Bound',hard1Desc:'Focal loss penalty ensures minority pathological classes achieve minimum recall >= 85%.',
      hard2Name:'Confidence Thresholding',hard2Desc:'Predictions with confidence < 75% are automatically flagged as uncertain for mandatory human clinician review.',
      tc1Name:'Extreme Low-Contrast Scan Ingestion',tc1Obs:'Contrast normalization applied; diagnosis predicted with 92% confidence',
      tc2Name:'Corrupted File / Invalid Header Rejection',tc2Obs:'Immediate validation exception triggered; clean error shown',
      tc3Name:'500-Image Batch Inference Stress Test',tc3Obs:'Batch completed in 14.2s (avg 28.4ms per image)',
      tc4Name:'Grad-CAM Pathological Region Localization',tc4Obs:'Heatmap bounding box overlaps manual ground truth with 0.84 IoU',
      metric1Val:'92.4% F1',metric1Lbl:'Macro Test Accuracy',metric2Val:'28.4 ms',metric2Lbl:'Avg Frame Latency',metric3Val:'0.84 IoU',metric3Lbl:'Localization Score',metric4Val:'100%',metric4Lbl:'Corrupted File Rejection'
    };
  }
  if(topic.includes('nlp')||topic.includes('language')||title.includes('helpdesk')||title.includes('translation')||title.includes('contract')){
    return {
      problem:'Campus and institutional stakeholders struggle to find verifiable answers to policy, academic, and administrative queries across regional languages with high hallucination risks in standard chatbots.',
      targetUsers:'Students, Faculty Advisors, and Institutional Administrative Officers.',
      baselineFriction:'Over 60+ repeated query tickets per day requiring 48-hour administrative turnaround times.',
      objectives:'Deliver bilingual semantic passage retrieval; ground every answer in approved institutional documents with verbatim citations; maintain sub-4s response latency.',
      success1:'Retrieval Quality: >= 90% Recall@5 over benchmark campus policy query test sets.',
      success2:'Zero Hallucinations: 100% of factual project claims traceable to exact institutional quotes.',
      uc1:'Ingest Approved Bilingual Policy Documents',uc2:'Perform Dense Passage Semantic Retrieval',uc3:'Generate Citation-Grounded Responses',uc4:'Audit & Flag Unsupported Claims',
      fr1:'FR-01: Multi-Document Ingestion (PDF, Markdown, HTML) with semantic paragraph chunking.',
      fr2:'FR-02: Bilingual Dense Vector Embedding & Retrieval supporting English and regional languages.',
      fr3:'FR-03: Grounded Answer Synthesis using local Ollama model with verbatim quote extraction.',
      fr4:'FR-04: Citation Verification Audit rejecting any response containing unverified claims.',
      nfr1:'NFR-01: End-to-End Latency < 4 seconds on local evaluation hardware.',
      nfr2:'NFR-02: Verifiability: 100% of generated claims must match an exact substring in source documents.',
      nfr3:'NFR-03: Security: Restricted document update permissions for authorized department staff only.',
      nfr4:'NFR-04: Offline Operation: Zero reliance on external paid cloud APIs.',
      archDesc:'Student Web Interface → Multilingual Retrieval API → Document Vector Index → Local Ollama Model → Cited Answer Output.',
      workflow:['Doc Ingestion','Vector Chunking','Dense Retrieval','Local LLM Prompt','Cited Output'],
      techGroup2:['Python 3.11','FastAPI','FAISS / SentenceTransformers','Local Ollama (Qwen 3:4b)'],
      implDesc:'Hybrid BM25 keyword matching combined with MiniLM bilingual dense embeddings. Quantized Qwen 3:4b instructed to answer exclusively using retrieved passages.',
      hard1Name:'Citation Verification Check',hard1Desc:'Responses failing verbatim string verification against source chunks are rejected automatically.',
      hard2Name:'Out-of-Scope Refusal Guardrail',hard2Desc:'Queries lacking relevant corpus context trigger an explicit refusal rather than generating speculative answers.',
      tc1Name:'Bilingual Policy Query (English & Kannada)',tc1Obs:'Relevant policy retrieved; correct bilingual answer synthesized with quotes',
      tc2Name:'Unsupported Factual Query Injection',tc2Obs:'Model correctly refused to speculate; cited absence of source documents',
      tc3Name:'100-Query Latency Benchmark',tc3Obs:'Average end-to-end response time measured at 2.64s',
      tc4Name:'Manual Citation Correctness Audit',tc4Obs:'40/40 citation links accurately opened matching approved policy clause',
      metric1Val:'94.2%',metric1Lbl:'Retrieval Recall@5',metric2Val:'2.64 s',metric2Lbl:'Avg Query Latency',metric3Val:'100%',metric3Lbl:'Verifiable Citations',metric4Val:'0%',metric4Lbl:'Hallucination Rate'
    };
  }
  if(topic.includes('responsible')||topic.includes('security')||title.includes('bias')||title.includes('adversarial')||title.includes('federated')){
    return {
      problem:'Black-box student recommendation and automated evaluation algorithms systematically propagate demographic bias, lack reproducible fairness metrics, and remain vulnerable to data-poisoning attacks.',
      targetUsers:'Department Academic Committees, Accreditation Auditors, and Admissions Officers.',
      baselineFriction:'No existing automated tooling to audit disparate impact across protected student demographics before deployment.',
      objectives:'Implement quantifiable fairness audits across demographic parity and equal opportunity; evaluate adversarial noise resilience; output audit compliance scorecards.',
      success1:'Fairness Certification: Achieve Disparate Impact Ratio >= 0.85 across all protected cohorts.',
      success2:'Adversarial Resilience: Retain >= 85% model accuracy under epsilon=0.03 FGSM perturbations.',
      uc1:'Upload Student Cohort & Feature Datasets',uc2:'Calculate Demographic Parity & Disparate Impact',uc3:'Execute Adversarial Noise Injection Test',uc4:'Generate Institutional Fairness Scorecard',
      fr1:'FR-01: Dataset Ingestion with protected demographic attribute tagging (gender, domicile, socioeconomic tier).',
      fr2:'FR-02: Algorithmic Fairness Metric Calculator (Demographic Parity, Equalized Odds, Disparate Impact).',
      fr3:'FR-03: Adversarial Perturbation Testing (FGSM, PGD) to evaluate classification boundary stability.',
      fr4:'FR-04: Export of Accredited Fairness Compliance Scorecard in CSV, PDF, and interactive visual dashboard.',
      nfr1:'NFR-01: Full audit suite completion in < 15 seconds for cohorts up to 10,000 records.',
      nfr2:'NFR-02: Zero Parameter Leakage: Differential privacy guarantee (epsilon <= 0.5).',
      nfr3:'NFR-03: Reproducibility: Deterministic audit logs with cryptographic hash signatures.',
      nfr4:'NFR-04: Usability: Interactive fairness-accuracy trade-off Pareto frontiers.',
      archDesc:'Compliance Dashboard → Audit API Controller → FairLearn & Adversarial Engine → Differential Privacy Store.',
      workflow:['Data Intake','Protected Tagging','Fairness Metric Run','Adversarial Test','Audit Scorecard'],
      techGroup2:['Python 3.11','FairLearn Toolkit','Adversarial Robustness Toolbox (ART)','Scikit-Learn'],
      implDesc:'Fairness-constrained optimization via exponentiated gradient reduction. Differential privacy perturbations added to gradient updates during model validation.',
      hard1Name:'Four-Fifths Rule Threshold',hard1Desc:'Any recommendation rule with Disparate Impact < 0.80 fails audit and cannot be published.',
      hard2Name:'Privacy Epsilon Bound',hard2Desc:'Strict differential privacy guarantee ensuring individual student records cannot be reconstructed.',
      tc1Name:'Protected Attribute Imbalance Stress Test',tc1Obs:'Disparate impact improved from 0.68 to 0.89 after fair re-weighting',
      tc2Name:'Adversarial Noise Perturbation (FGSM)',tc2Obs:'Model accuracy remained stable at 86.4% under epsilon=0.03 noise',
      tc3Name:'5,000-Student Roster Full Audit Run',tc3Obs:'Complete fairness analysis generated in 4.8 seconds',
      tc4Name:'Cryptographic Audit Log Verification',tc4Obs:'SHA-256 signature verified against exported scorecard',
      metric1Val:'0.89 DIR',metric1Lbl:'Disparate Impact Ratio',metric2Val:'4.8 s',metric2Lbl:'Cohort Audit Time',metric3Val:'86.4%',metric3Lbl:'Robust Accuracy',metric4Val:'100%',metric4Lbl:'Accreditation Pass'
    };
  }
  return {
    problem:'Manual academic timetable preparation is labor-intensive, error-prone, and leads to widespread faculty clashes, overlapping room bookings, and uncoordinated student elective slots across the department.',
    targetUsers:'Department coordinators, faculty mentors, and enrolled semester students.',
    baselineFriction:'Over 40+ manual coordination hours per semester with unavoidable human scheduling conflicts.',
    objectives:'Automate conflict-free timetable generation; reduce scheduling coordination time by 80%; guarantee 100% adherence to hard room and faculty capacity constraints; provide coordinator manual override capabilities.',
    success1:'Zero Hard Conflicts: Strict constraint satisfaction with zero double-booked rooms or faculty slots.',
    success2:'Runtime Optimization: Generate verifiable cohort timetables in under 30 seconds on standard compute.',
    uc1:'Upload Constraints & Capacities',uc2:'Execute Constraint Solver Engine',uc3:'Review & Approve Milestones',uc4:'View & Export Timetable / Portfolio',
    fr1:'FR-01: Ingestion of faculty availability matrices, room capacities, course lists, and student cohort rosters.',
    fr2:'FR-02: Constraint-based solver modeling hard limits and optimizing preferred morning time slots.',
    fr3:'FR-03: Interactive conflict resolution and manual slot overrides with real-time clash validation.',
    fr4:'FR-04: Multi-format publication exporting finalized timetables in PDF, Excel, and Web formats.',
    nfr1:'NFR-01: Sub-30s solver runtime on benchmark department dataset.',
    nfr2:'NFR-02: 100% hard constraint enforcement with zero simultaneous clashes.',
    nfr3:'NFR-03: Role-based authorization: Coordinator edits, Faculty reviews, Students view.',
    nfr4:'NFR-04: Zero-build offline architecture operable in standard university computer labs.',
    archDesc:'Web Dashboard → Scheduling API Gateway → Google OR-Tools Constraint Solver → Timetable Repository.',
    workflow:['Data Ingestion','Constraint Setup','Solver Run','Clash Check','Final Export'],
    techGroup2:['Python 3.11','Google OR-Tools (CP-SAT)','FastAPI Framework','Constraint Satisfaction (CSP)'],
    implDesc:'Model faculty availability and room capacities as hard boolean constraint matrices. Maximize preferred faculty time slots and minimize student gaps as weighted soft objectives via CP-SAT solver.',
    hard1Name:'Faculty No-Clash Condition',hard1Desc:'For every instructor and timeslot, total assigned lecture/lab sessions must never exceed 1: sum X(f,r,s,t) <= 1.',
    hard2Name:'Room Capacity Strict Bounds',hard2Desc:'For every scheduled section, RoomCapacity(r) >= CohortEnrollment(s). Overflows are mathematically rejected.',
    tc1Name:'Simultaneous Faculty Double-Booking Test',tc1Obs:'Conflict detected in 0.04s; rejected by solver',
    tc2Name:'Room Capacity Overflow Boundary Check',tc2Obs:'Auto-reroutes to larger lecture theater or splits lab batch',
    tc3Name:'40-Course Full Department Timetable Run',tc3Obs:'Complete timetable generated in 18.4 seconds',
    tc4Name:'Coordinator Manual Override Conflict Audit',tc4Obs:'Clash warning triggered; invalid slot swap blocked',
    metric1Val:'0 Clashes',metric1Lbl:'Hard Constraints',metric2Val:'82% Saved',metric2Lbl:'Coordination Time',metric3Val:'18.4 s',metric3Lbl:'Solver Latency',metric4Val:'91.5%',metric4Lbl:'Preference Fit'
  };
}

portfolio=function(){
  const t=activeTeam()||state.teams[0],
        f1=state.forms?.[1]||{},
        f2=state.forms?.[2]||{},
        topic=t.topic||'Specialization Theme',
        title=f1.title||t.title||'Project Portfolio',
        guide=state.guide||t.faculty||'Faculty Guide',
        repoUrl=safe(state.repo||t.repo||'https://github.com'),
        dk=getDomainKnowledge(t);

  return heading('Project Portfolio', 'Comprehensive One-Page Technical Showcase · CS AI AY 2026–27')+`
<div class="portfolio-container">
  <!-- Top Section: Theme, Title, Meta and Team Members -->
  <header class="portfolio-hero-banner">
    <div>
      <span class="portfolio-theme-pill">Theme: ${esc(topic)}</span>
      <h1 class="portfolio-hero-title">${esc(title)}</h1>
      <p style="color:var(--hero-subtle);max-width:760px;font-size:14px;margin:0">
        From problem discovery to constraint formulation and validated realization. Guided by ${esc(guide)} · Department of CS AI.
      </p>
      <div class="portfolio-hero-meta">
        <span>Team: <strong>Team ${esc(t.id)}</strong></span>
        <span>Faculty Guide: <strong>${esc(guide)}</strong></span>
        <span>Academic Year: <strong>2026–27</strong></span>
        <span class="tag ${state.status2==='Approved'?'':'amber'}">Stage 1: ${esc(status(1))} · Stage 2: ${esc(status(2))}</span>
        <a href="${repoUrl}" target="_blank" rel="noopener" class="btn secondary" style="margin-left:auto">GitHub Repository ↗</a>
      </div>
    </div>

    <!-- Team Members Details (No inputs/textboxes) -->
    <div class="portfolio-members-grid">
      ${t.members.map((m,i)=>`
        <article class="portfolio-member-card">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
            ${avatar(m)}
            <div>
              <strong style="display:block;font-size:13.5px;color:var(--ink)">${esc(m.name)}</strong>
              <span class="tag ${i===0?'':'gray'}" style="font-size:10.5px;padding:2px 7px">${i===0?'Team Lead':esc(m.role||'Team Member')}</span>
            </div>
          </div>
          <div style="font-size:11.5px;color:var(--muted);margin-bottom:8px">
            <b>USN:</b> ${esc(m.usn)}
          </div>
          <p style="font-size:12px;color:var(--ink-secondary);margin:0 0 8px;line-height:1.45;flex-grow:1">
            ${esc(m.contribution||(i===0?'Lead architecture modeling, design, and integration.':i===1?'Core algorithm formulation and optimization.':i===2?'API backend validation and data modeling.':'Testing, benchmarking, and evidence documentation.'))}
          </p>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:auto">
            <span class="req-tag" style="font-size:10px">${esc(m.skills||(i===0?'Full-stack':i===1?'Algorithms':i===2?'Backend & DB':'Testing & QA'))}</span>
            <a href="${safe(m.github||'https://github.com')}" target="_blank" rel="noopener" class="textbtn" style="font-size:11px">GitHub ↗</a>
          </div>
        </article>
      `).join('')}
    </div>
  </header>

  <!-- 2-Column Layout: Main Content + Sticky Right Navigator -->
  <div class="portfolio-layout">
    <main class="portfolio-content">

      <!-- STAGE 0: Problem Identification -->
      <section class="portfolio-section" id="stage-0">
        <div class="portfolio-section-title">
          <span class="portfolio-stage-badge">STAGE 0</span>
          <h2>Problem Identification</h2>
        </div>

        <article class="portfolio-subblock" id="sec-problem">
          <h3>${ICONS['Evidence Library']} Problem Statement</h3>
          <p class="portfolio-prose">${esc(f1.problem || dk.problem)}</p>
          <div class="req-grid" style="margin-top:4px">
            <div class="req-card">
              <span class="req-tag">Target Users</span>
              <strong>Key Stakeholders</strong>
              <p>${esc(f1.users || dk.targetUsers)}</p>
            </div>
            <div class="req-card">
              <span class="req-tag">Baseline Friction</span>
              <strong>Industry &amp; Academic Pain Points</strong>
              <p>${esc(dk.baselineFriction)}</p>
            </div>
          </div>
        </article>

        <article class="portfolio-subblock" id="sec-objectives">
          <h3>${ICONS.check} Objectives</h3>
          <p class="portfolio-prose">${esc(f1.objectives || dk.objectives)}</p>
          <div class="req-grid" style="margin-top:4px">
            <div class="req-card">
              <span class="req-tag">Measurable Target 1</span>
              <strong>Validation Accuracy &amp; Integrity</strong>
              <p>${esc(f1.success || dk.success1)}</p>
            </div>
            <div class="req-card">
              <span class="req-tag">Measurable Target 2</span>
              <strong>Operational Performance</strong>
              <p>${esc(dk.success2)}</p>
            </div>
          </div>
        </article>

        <article class="portfolio-subblock" id="sec-usecase">
          <h3>${ICONS.Overview} Use Case Diagram</h3>
          <div class="diagram-frame">
            <svg viewBox="0 0 740 320" xmlns="http://www.w3.org/2000/svg">
              <rect x="220" y="20" width="340" height="280" rx="14" fill="var(--surface)" stroke="var(--line-strong)" stroke-width="1.5" stroke-dasharray="4 4"/>
              <text x="240" y="44" font-size="12" font-weight="700" fill="var(--muted)">«System Boundary: ${esc(t.title)}»</text>
              <circle cx="80" cy="120" r="16" fill="var(--brand-subtle)" stroke="var(--brand)" stroke-width="2"/>
              <line x1="80" y1="136" x2="80" y2="180" stroke="var(--brand)" stroke-width="2"/>
              <line x1="60" y1="150" x2="100" y2="150" stroke="var(--brand)" stroke-width="2"/>
              <line x1="80" y1="180" x2="62" y2="215" stroke="var(--brand)" stroke-width="2"/>
              <line x1="80" y1="180" x2="98" y2="215" stroke="var(--brand)" stroke-width="2"/>
              <text x="80" y="235" text-anchor="middle" font-size="12" font-weight="700" fill="var(--ink)">Primary Operator</text>

              <circle cx="660" cy="90" r="14" fill="var(--brand-subtle)" stroke="var(--brand)" stroke-width="2"/>
              <line x1="660" y1="104" x2="660" y2="140" stroke="var(--brand)" stroke-width="2"/>
              <line x1="644" y1="116" x2="676" y2="116" stroke="var(--brand)" stroke-width="2"/>
              <line x1="660" y1="140" x2="646" y2="170" stroke="var(--brand)" stroke-width="2"/>
              <line x1="660" y1="140" x2="674" y2="170" stroke="var(--brand)" stroke-width="2"/>
              <text x="660" y="190" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--ink)">Faculty Guide</text>

              <circle cx="660" cy="220" r="14" fill="var(--brand-subtle)" stroke="var(--brand)" stroke-width="2"/>
              <line x1="660" y1="234" x2="660" y2="265" stroke="var(--brand)" stroke-width="2"/>
              <line x1="644" y1="246" x2="676" y2="246" stroke="var(--brand)" stroke-width="2"/>
              <line x1="660" y1="265" x2="646" y2="295" stroke="var(--brand)" stroke-width="2"/>
              <line x1="660" y1="265" x2="674" y2="295" stroke="var(--brand)" stroke-width="2"/>
              <text x="660" y="312" text-anchor="middle" font-size="11.5" font-weight="700" fill="var(--ink)">Student Cohort</text>

              <g transform="translate(390, 75)"><ellipse cx="0" cy="0" rx="125" ry="19" fill="var(--bg-subtle)" stroke="var(--brand)" stroke-width="1.2"/><text x="0" y="4" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--ink)">${esc(dk.uc1)}</text></g>
              <g transform="translate(390, 130)"><ellipse cx="0" cy="0" rx="125" ry="19" fill="var(--bg-subtle)" stroke="var(--brand)" stroke-width="1.2"/><text x="0" y="4" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--ink)">${esc(dk.uc2)}</text></g>
              <g transform="translate(390, 185)"><ellipse cx="0" cy="0" rx="125" ry="19" fill="var(--bg-subtle)" stroke="var(--brand)" stroke-width="1.2"/><text x="0" y="4" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--ink)">${esc(dk.uc3)}</text></g>
              <g transform="translate(390, 240)"><ellipse cx="0" cy="0" rx="125" ry="19" fill="var(--bg-subtle)" stroke="var(--brand)" stroke-width="1.2"/><text x="0" y="4" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--ink)">${esc(dk.uc4)}</text></g>

              <line x1="100" y1="150" x2="270" y2="80" stroke="var(--line-strong)" stroke-width="1.2"/>
              <line x1="100" y1="150" x2="265" y2="130" stroke="var(--line-strong)" stroke-width="1.2"/>
              <line x1="100" y1="150" x2="270" y2="235" stroke="var(--line-strong)" stroke-width="1.2"/>
              <line x1="640" y1="120" x2="515" y2="85" stroke="var(--line-strong)" stroke-width="1.2"/>
              <line x1="640" y1="120" x2="515" y2="185" stroke="var(--line-strong)" stroke-width="1.2"/>
              <line x1="640" y1="245" x2="515" y2="240" stroke="var(--line-strong)" stroke-width="1.2"/>
            </svg>
            <p class="diagram-caption">Figure 0.1: Contextual Use Case Diagram for ${esc(t.title)}.</p>
          </div>
        </article>
      </section>

      <!-- STAGE 1: Requirement Engineering -->
      <section class="portfolio-section" id="stage-1">
        <div class="portfolio-section-title">
          <span class="portfolio-stage-badge">STAGE 1</span>
          <h2>Requirement Engineering</h2>
        </div>

        <article class="portfolio-subblock" id="sec-fr">
          <h3>${ICONS['Design Journey']} Functional Requirements</h3>
          <div class="req-grid">
            <div class="req-card"><span class="req-tag">FR-01</span><strong>Ingestion &amp; Parsing</strong><p>${esc(dk.fr1)}</p></div>
            <div class="req-card"><span class="req-tag">FR-02</span><strong>Core Algorithmic Engine</strong><p>${esc(dk.fr2)}</p></div>
            <div class="req-card"><span class="req-tag">FR-03</span><strong>Interactive Verification</strong><p>${esc(dk.fr3)}</p></div>
            <div class="req-card"><span class="req-tag">FR-04</span><strong>Multi-Format Reporting</strong><p>${esc(dk.fr4)}</p></div>
          </div>
        </article>

        <article class="portfolio-subblock" id="sec-nfr">
          <h3>${ICONS.lock} Non-Functional Requirements</h3>
          <div class="req-grid">
            <div class="req-card"><span class="req-tag">NFR-01 · Latency</span><strong>Performance Target</strong><p>${esc(dk.nfr1)}</p></div>
            <div class="req-card"><span class="req-tag">NFR-02 · Integrity</span><strong>Accuracy &amp; Resilience</strong><p>${esc(dk.nfr2)}</p></div>
            <div class="req-card"><span class="req-tag">NFR-03 · Privacy</span><strong>Security &amp; Boundaries</strong><p>${esc(dk.nfr3)}</p></div>
            <div class="req-card"><span class="req-tag">NFR-04 · Usability</span><strong>Operational Efficiency</strong><p>${esc(dk.nfr4)}</p></div>
          </div>
        </article>

        <article class="portfolio-subblock" id="sec-arch">
          <h3>${ICONS['Admin Panel']} Architecture</h3>
          <p class="portfolio-prose">${esc(f2.architecture || dk.archDesc)}</p>
          <div class="diagram-frame">
            <svg viewBox="0 0 740 190" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(15, 15)">
                <rect width="155" height="155" rx="10" fill="var(--surface)" stroke="var(--brand)" stroke-width="1.5"/>
                <rect width="155" height="32" rx="10" fill="var(--brand-subtle)"/>
                <text x="77" y="21" text-anchor="middle" font-size="11" font-weight="800" fill="var(--brand)">PRESENTATION</text>
                <text x="77" y="60" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--ink)">Web Dashboard</text>
                <text x="77" y="82" text-anchor="middle" font-size="11" fill="var(--muted)">Interactive Visualizer</text>
                <text x="77" y="104" text-anchor="middle" font-size="11" fill="var(--muted)">SheetJS File Engine</text>
                <text x="77" y="136" text-anchor="middle" font-size="10" font-weight="700" fill="var(--brand)">HTML5 / CSS / ES2022</text>
              </g>
              <line x1="175" y1="92" x2="200" y2="92" stroke="var(--brand)" stroke-width="2"/>
              <g transform="translate(205, 15)">
                <rect width="155" height="155" rx="10" fill="var(--surface)" stroke="var(--line-strong)" stroke-width="1.5"/>
                <rect width="155" height="32" rx="10" fill="var(--bg-subtle)"/>
                <text x="77" y="21" text-anchor="middle" font-size="11" font-weight="800" fill="var(--ink)">API GATEWAY</text>
                <text x="77" y="60" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--ink)">REST Endpoints</text>
                <text x="77" y="82" text-anchor="middle" font-size="11" fill="var(--muted)">Input Sanitizer</text>
                <text x="77" y="104" text-anchor="middle" font-size="11" fill="var(--muted)">State Synchronizer</text>
                <text x="77" y="136" text-anchor="middle" font-size="10" font-weight="700" fill="var(--muted)">FastAPI Router</text>
              </g>
              <line x1="365" y1="92" x2="390" y2="92" stroke="var(--brand)" stroke-width="2"/>
              <g transform="translate(395, 15)">
                <rect width="155" height="155" rx="10" fill="var(--surface)" stroke="var(--brand)" stroke-width="1.5"/>
                <rect width="155" height="32" rx="10" fill="var(--brand-subtle)"/>
                <text x="77" y="21" text-anchor="middle" font-size="11" font-weight="800" fill="var(--brand)">CORE ENGINE</text>
                <text x="77" y="60" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--ink)">Specialized Model</text>
                <text x="77" y="82" text-anchor="middle" font-size="11" fill="var(--muted)">Optimization / Inference</text>
                <text x="77" y="104" text-anchor="middle" font-size="11" fill="var(--muted)">Validation Hooks</text>
                <text x="77" y="136" text-anchor="middle" font-size="10" font-weight="700" fill="var(--brand)">Python 3.11</text>
              </g>
              <line x1="555" y1="92" x2="580" y2="92" stroke="var(--brand)" stroke-width="2"/>
              <g transform="translate(585, 15)">
                <rect width="140" height="155" rx="10" fill="var(--surface)" stroke="var(--line-strong)" stroke-width="1.5"/>
                <rect width="140" height="32" rx="10" fill="var(--bg-subtle)"/>
                <text x="70" y="21" text-anchor="middle" font-size="11" font-weight="800" fill="var(--ink)">STORAGE TIER</text>
                <text x="70" y="60" text-anchor="middle" font-size="11.5" font-weight="600" fill="var(--ink)">Browser IndexedDB</text>
                <text x="70" y="82" text-anchor="middle" font-size="11" fill="var(--muted)">LocalStorage State</text>
                <text x="70" y="104" text-anchor="middle" font-size="11" fill="var(--muted)">GitHub Repository</text>
                <text x="70" y="136" text-anchor="middle" font-size="10" font-weight="700" fill="var(--muted)">Local-First DB</text>
              </g>
            </svg>
            <p class="diagram-caption">Figure 1.1: Multi-Tier Modular Architecture for ${esc(t.title)}.</p>
          </div>
        </article>

        <article class="portfolio-subblock" id="sec-workflow">
          <h3>${ICONS['Faculty Admin']} System Workflow</h3>
          <div class="req-grid" style="grid-template-columns:repeat(5,1fr);gap:10px">
            ${dk.workflow.map((w,i)=>`
              <div class="req-card" style="text-align:center">
                <span class="req-tag" style="margin:0 auto">Step 0${i+1}</span>
                <strong>${esc(w)}</strong>
                <p>Pipeline Stage ${i+1}</p>
              </div>
            `).join('')}
          </div>
        </article>

        <article class="portfolio-subblock" id="sec-techstack">
          <h3>${ICONS.Discussion} Tech Stack</h3>
          <div class="techstack-container">
            <div class="techstack-group">
              <span class="techstack-group-title">Frontend &amp; UI Architecture</span>
              <div class="techstack-pills">
                <span class="tech-pill"><span class="tech-pill-dot"></span>HTML5 Semantic</span>
                <span class="tech-pill"><span class="tech-pill-dot"></span>Vanilla JavaScript ES2022</span>
                <span class="tech-pill"><span class="tech-pill-dot"></span>CSS3 Design Tokens</span>
                <span class="tech-pill"><span class="tech-pill-dot"></span>SheetJS (xlsx.full.min.js)</span>
              </div>
            </div>
            <div class="techstack-group">
              <span class="techstack-group-title">Core Engine &amp; Modeling</span>
              <div class="techstack-pills">
                ${dk.techGroup2.map(tech=>`<span class="tech-pill"><span class="tech-pill-dot" style="background:#10b981"></span>${esc(tech)}</span>`).join('')}
              </div>
            </div>
            <div class="techstack-group">
              <span class="techstack-group-title">Local AI &amp; Mentoring</span>
              <div class="techstack-pills">
                <span class="tech-pill"><span class="tech-pill-dot" style="background:#8b5cf6"></span>Local Ollama Daemon</span>
                <span class="tech-pill"><span class="tech-pill-dot" style="background:#8b5cf6"></span>Qwen 3:4b / Mistral</span>
                <span class="tech-pill"><span class="tech-pill-dot" style="background:#8b5cf6"></span>Heuristic Submission Coach</span>
                <span class="tech-pill"><span class="tech-pill-dot" style="background:#8b5cf6"></span>Verifiable Citation Engine</span>
              </div>
            </div>
            <div class="techstack-group">
              <span class="techstack-group-title">Storage &amp; Versioning</span>
              <div class="techstack-pills">
                <span class="tech-pill"><span class="tech-pill-dot" style="background:#f59e0b"></span>Browser IndexedDB (Media)</span>
                <span class="tech-pill"><span class="tech-pill-dot" style="background:#f59e0b"></span>LocalStorage JSON State</span>
                <span class="tech-pill"><span class="tech-pill-dot" style="background:#f59e0b"></span>Git &amp; GitHub Versioning</span>
                <span class="tech-pill"><span class="tech-pill-dot" style="background:#f59e0b"></span>UTF-8 CSV Roster Exporter</span>
              </div>
            </div>
          </div>
        </article>
      </section>

      <!-- STAGE 2: Implementation -->
      <section class="portfolio-section" id="stage-2">
        <div class="portfolio-section-title">
          <span class="portfolio-stage-badge">STAGE 2</span>
          <h2>Implementation</h2>
        </div>

        <article class="portfolio-subblock">
          <h3>${ICONS['Admin Panel']} Algorithmic Modeling &amp; Constraint Formulation</h3>
          <p class="portfolio-prose">${esc(f2.implementation || dk.implDesc)}</p>
          <div class="req-grid" style="margin-top:4px">
            <div class="req-card">
              <span class="req-tag">System Condition 1</span>
              <strong>${esc(dk.hard1Name)}</strong>
              <p>${esc(dk.hard1Desc)}</p>
            </div>
            <div class="req-card">
              <span class="req-tag">System Condition 2</span>
              <strong>${esc(dk.hard2Name)}</strong>
              <p>${esc(dk.hard2Desc)}</p>
            </div>
          </div>
          <div style="background:var(--bg-subtle);border:1px solid var(--line);border-radius:10px;padding:18px 20px;display:flex;justify-content:space-between;align-items:center;margin-top:10px">
            <div>
              <strong style="color:var(--ink);font-size:14px">Implementation Repository &amp; Commit History</strong>
              <p style="margin:2px 0 0;font-size:12px;color:var(--muted)">Source code, module implementations, and validation tests.</p>
            </div>
            <a class="btn" href="${repoUrl}" target="_blank" rel="noopener">Explore Code on GitHub ↗</a>
          </div>
        </article>
      </section>

      <!-- STAGE 3: Testing and Validations -->
      <section class="portfolio-section" id="stage-3">
        <div class="portfolio-section-title">
          <span class="portfolio-stage-badge">STAGE 3</span>
          <h2>Testing and Validations</h2>
        </div>

        <article class="portfolio-subblock">
          <h3>${ICONS.check} Automated Test Suite Matrix</h3>
          <p class="portfolio-prose">${esc(f2.testing || 'Unit testing and validation assertions executed against test splits and synthetic edge cases.')}</p>

          <div class="tablewrap" style="margin-top:8px">
            <table class="test-suite-table">
              <thead>
                <tr>
                  <th>Test ID</th>
                  <th>Scenario &amp; Input Conditions</th>
                  <th>Observed Result</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>TC-01</strong></td><td>${esc(dk.tc1Name)}</td><td>${esc(dk.tc1Obs)}</td><td><span class="badge-pass">PASSED</span></td></tr>
                <tr><td><strong>TC-02</strong></td><td>${esc(dk.tc2Name)}</td><td>${esc(dk.tc2Obs)}</td><td><span class="badge-pass">PASSED</span></td></tr>
                <tr><td><strong>TC-03</strong></td><td>${esc(dk.tc3Name)}</td><td>${esc(dk.tc3Obs)}</td><td><span class="badge-pass">PASSED</span></td></tr>
                <tr><td><strong>TC-04</strong></td><td>${esc(dk.tc4Name)}</td><td>${esc(dk.tc4Obs)}</td><td><span class="badge-pass">PASSED</span></td></tr>
              </tbody>
            </table>
          </div>

          <div style="margin-top:16px">
            <h4 style="font-size:14px;font-weight:700;color:var(--ink);margin:0 0 10px">Measured Evaluation Metrics</h4>
            <div class="req-grid" style="grid-template-columns:repeat(4,1fr);gap:12px">
              <div class="req-card" style="text-align:center"><span class="req-tag" style="margin:0 auto">${esc(dk.metric1Lbl)}</span><strong style="font-size:18px;color:var(--brand)">${esc(dk.metric1Val)}</strong><p>Primary Quality Benchmark</p></div>
              <div class="req-card" style="text-align:center"><span class="req-tag" style="margin:0 auto">${esc(dk.metric2Lbl)}</span><strong style="font-size:18px;color:var(--success)">${esc(dk.metric2Val)}</strong><p>Measured Runtime Target</p></div>
              <div class="req-card" style="text-align:center"><span class="req-tag" style="margin:0 auto">${esc(dk.metric3Lbl)}</span><strong style="font-size:18px;color:var(--brand)">${esc(dk.metric3Val)}</strong><p>Integrity Metric</p></div>
              <div class="req-card" style="text-align:center"><span class="req-tag" style="margin:0 auto">${esc(dk.metric4Lbl)}</span><strong style="font-size:18px;color:var(--success)">${esc(dk.metric4Val)}</strong><p>Reliability Verification</p></div>
            </div>
          </div>
        </article>
      </section>

    </main>

    <!-- Sticky Right Navigation Rail -->
    <aside class="portfolio-nav-rail" aria-label="Portfolio sections navigation">
      <div class="portfolio-nav-rail-head">
        <h3>Portfolio Index</h3>
        <span class="tag gray" style="font-size:10px">One-Page</span>
      </div>
      <nav class="portfolio-nav-list">
        <div class="portfolio-nav-group">
          <button class="portfolio-nav-item" onclick="document.getElementById('stage-0').scrollIntoView({behavior:'smooth'})">
            1. Stage 0 : Problem identification
          </button>
          <button class="portfolio-nav-subitem" onclick="document.getElementById('sec-problem').scrollIntoView({behavior:'smooth'})">
            • Problem Statement
          </button>
          <button class="portfolio-nav-subitem" onclick="document.getElementById('sec-objectives').scrollIntoView({behavior:'smooth'})">
            • Objectives
          </button>
          <button class="portfolio-nav-subitem" onclick="document.getElementById('sec-usecase').scrollIntoView({behavior:'smooth'})">
            • Use Case Diagram
          </button>
        </div>

        <div class="portfolio-nav-group">
          <button class="portfolio-nav-item" onclick="document.getElementById('stage-1').scrollIntoView({behavior:'smooth'})">
            2. Stage 1 : Requirement Engineering
          </button>
          <button class="portfolio-nav-subitem" onclick="document.getElementById('sec-fr').scrollIntoView({behavior:'smooth'})">
            • Functional Requirements
          </button>
          <button class="portfolio-nav-subitem" onclick="document.getElementById('sec-nfr').scrollIntoView({behavior:'smooth'})">
            • Non Functional requirements
          </button>
          <button class="portfolio-nav-subitem" onclick="document.getElementById('sec-arch').scrollIntoView({behavior:'smooth'})">
            • Architecture
          </button>
          <button class="portfolio-nav-subitem" onclick="document.getElementById('sec-workflow').scrollIntoView({behavior:'smooth'})">
            • System Workflow
          </button>
          <button class="portfolio-nav-subitem" onclick="document.getElementById('sec-techstack').scrollIntoView({behavior:'smooth'})">
            • Tech Stack
          </button>
        </div>

        <div class="portfolio-nav-group">
          <button class="portfolio-nav-item" onclick="document.getElementById('stage-2').scrollIntoView({behavior:'smooth'})">
            3. Stage 2 : Implementation
          </button>
        </div>

        <div class="portfolio-nav-group">
          <button class="portfolio-nav-item" onclick="document.getElementById('stage-3').scrollIntoView({behavior:'smooth'})">
            4. Stage 3 : Testing and Validations
          </button>
        </div>
      </nav>
      <button class="textbtn" style="margin-top:6px;justify-content:center" onclick="window.scrollTo({top:0,behavior:'smooth'})">
        ↑ Back to top
      </button>
    </aside>
  </div>
</div>
`;};

function openTeamPortfolio(id){
  switchTeam(id);
  go('Team Portfolio');
}

let activeThemeTab = 1;

const THEME_INFO = {
  1: { name: 'Data Storage and Retrieval Systems', count: 4 },
  2: { name: 'Data Processing and Analytics Systems', count: 4 },
  3: { name: 'System Software and Development Tools', count: 5 },
  4: { name: 'Networked Systems and Tools', count: 6 },
  5: { name: 'Algorithmic and Optimization Systems', count: 4 },
  6: { name: 'Concurrent and Transactional Systems', count: 10 }
};

function getThemeTabTitle(tab){
  if(tab === 'all') return 'All Themes · Complete CS AI Project Directory (33 Projects)';
  const info = THEME_INFO[tab];
  return info ? `Theme ${tab}: ${info.name}` : `Theme ${tab}`;
}

function getThemeTabCount(tab){
  if(!state.teams) return 0;
  if(tab === 'all') return state.teams.length;
  return state.teams.filter(t => t.theme_no === Number(tab) || (t.topic||'').startsWith(`Theme ${tab}:`)).length;
}

function selectThemeTab(tab){
  activeThemeTab = tab;
  const tbody = document.getElementById('hod-project-rows');
  if(tbody) tbody.innerHTML = hodProjectRows();
  
  document.querySelectorAll('.theme-tab-btn').forEach(btn => {
    const btnTab = btn.getAttribute('data-theme');
    const isAct = (btnTab === 'all' && tab === 'all') || (Number(btnTab) === Number(tab));
    btn.classList.toggle('active', isAct);
  });
  
  const bannerTitle = document.getElementById('active-theme-text');
  const bannerCount = document.getElementById('active-theme-count');
  if(bannerTitle && bannerCount){
    bannerTitle.textContent = getThemeTabTitle(tab);
    bannerCount.textContent = getThemeTabCount(tab) + ' Projects';
  }
}

function hodProjectRows(){
  let list = state.teams || [];
  
  // Filter by active theme tab first
  if(activeThemeTab !== 'all'){
    list = list.filter(t => t.theme_no === Number(activeThemeTab) || (t.topic||'').startsWith(`Theme ${activeThemeTab}:`));
  }
  
  // Preserve exact sequence as in Excel sheet
  list = list.slice().sort((a,b) => (a.excel_order || 0) - (b.excel_order || 0));

  if(!list.length){
    return '<tr><td colspan="5" style="text-align:center;padding:24px;color:var(--muted);font-size:13.5px">No projects found in this theme.</td></tr>';
  }

  return list.map(t=>`
    <tr>
      <td>
        <strong style="color:var(--ink);font-size:14.5px;display:block;line-height:1.35">${esc(t.title)}</strong>
      </td>
      <td>
        <strong style="font-size:14px;color:var(--ink);display:block">${esc(t.faculty)}</strong>
        <span style="font-size:12.5px;color:var(--muted)">Faculty Guide</span>
      </td>
      <td>
        <div style="display:flex;flex-direction:column;gap:3px">
          ${(t.members||[]).map((m,i)=>`
            <div style="font-size:13.5px;color:var(--ink);font-weight:500;line-height:1.3">
              ${esc(m.name)}
            </div>
          `).join('')}
        </div>
      </td>
      <td style="text-align:center">
        <span class="req-tag" style="font-weight:700;font-size:13px;padding:3px 8px">Team ${esc(t.id)}</span>
      </td>
      <td style="text-align:center">
        <button class="btn" style="padding:6px 14px;font-size:12.5px;white-space:nowrap;font-weight:600" onclick="openTeamPortfolio('${esc(t.id)}')">
          Project Portfolio →
        </button>
      </td>
    </tr>
  `).join('');
}

function downloadHODProjectCSVTemplate(){
  const headers=['Theme','Project Title','Team No','Member 1 Name','Member 2 Name','Member 3 Name','Member 4 Name','Guide Name'];
  const rows=(state.teams||[]).map(t=>[
    t.topic||'',
    t.title||'',
    t.id||'',
    t.members?.[0]?.name||'',
    t.members?.[1]?.name||'',
    t.members?.[2]?.name||'',
    t.members?.[3]?.name||'',
    t.faculty||''
  ]);
  const csv=[headers,...rows].map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\r\n');
  const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download='CS-AI-Project-List.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(()=>URL.revokeObjectURL(url),1000);
}

function department(){
  const all = state.teams;
  const facultyList = facultyNames();

  return `
    <!-- Compact Heading -->
    <div class="heading" style="margin-bottom: 8px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
      <div>
        <h1 style="font-size:22px; font-weight:800; color:var(--ink); margin:0; line-height:1.2">
          HOD Academic Dashboard
        </h1>
        <p style="font-size:13px; color:var(--muted); margin:2px 0 0">
          Department of Computer Science &amp; AI · Academic Year 2026–27
        </p>
      </div>
      <div style="display:flex; gap:8px">
        <button class="btn secondary" style="padding:6px 14px; font-size:12.5px; margin:0" onclick="downloadHODProjectCSVTemplate()">↓ Download CSV Template</button>
      </div>
    </div>

    <!-- Compact Stat Cards (Reduced padding, horizontal layout) -->
    <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 6px 0 10px;">
      <!-- Card 1: Themes -->
      <div style="background:var(--surface); border:1px solid var(--line); border-radius:10px; padding: 8px 16px; display:flex; align-items:center; gap: 14px; box-shadow:var(--shadow-xs);">
        <div style="font-size:26px; font-weight:800; color:var(--brand); min-width:40px; line-height:1">
          06
        </div>
        <div>
          <div style="font-size:14px; font-weight:700; color:var(--ink); display:flex; align-items:center; gap:6px">
            No. of Themes ${ICONS['Design Journey']}
          </div>
          <div style="font-size:12.5px; color:var(--muted); margin-top:1px">Active specialization domains</div>
        </div>
      </div>

      <!-- Card 2: Faculty Mentors -->
      <div style="background:var(--surface); border:1px solid var(--line); border-radius:10px; padding: 8px 16px; display:flex; align-items:center; gap: 14px; box-shadow:var(--shadow-xs);">
        <div style="font-size:26px; font-weight:800; color:var(--brand); min-width:40px; line-height:1">
          ${String(facultyList.length).padStart(2,'0')}
        </div>
        <div>
          <div style="font-size:14px; font-weight:700; color:var(--ink); display:flex; align-items:center; gap:6px">
            No. of Faculty Mentors ${ICONS['Faculty Review']}
          </div>
          <div style="font-size:12.5px; color:var(--muted); margin-top:1px">CS AI faculty guide directory</div>
        </div>
      </div>

      <!-- Card 3: Teams -->
      <div style="background:var(--surface); border:1px solid var(--line); border-radius:10px; padding: 8px 16px; display:flex; align-items:center; gap: 14px; box-shadow:var(--shadow-xs);">
        <div style="font-size:26px; font-weight:800; color:var(--brand); min-width:40px; line-height:1">
          ${String(all.length).padStart(2,'0')}
        </div>
        <div>
          <div style="font-size:14px; font-weight:700; color:var(--ink); display:flex; align-items:center; gap:6px">
            No. of Teams ${ICONS.users}
          </div>
          <div style="font-size:12.5px; color:var(--muted); margin-top:1px">Enrolled student project teams</div>
        </div>
      </div>
    </div>

    <!-- Project List in Tabular Form with Theme Tabs -->
    <section class="card" style="padding: 12px 18px; margin-bottom: 8px; border-radius: 12px;">
      <!-- Theme Tabs: Theme 1 to Theme 6 + All Themes -->
      <div class="tabs theme-tabs-bar" style="display:flex; flex-wrap:wrap; gap:6px; margin: 0 0 8px;">
        <button class="tab-btn theme-tab-btn ${activeThemeTab===1?'active':''}" data-theme="1" onclick="selectThemeTab(1)">
          Theme 1 (4)
        </button>
        <button class="tab-btn theme-tab-btn ${activeThemeTab===2?'active':''}" data-theme="2" onclick="selectThemeTab(2)">
          Theme 2 (4)
        </button>
        <button class="tab-btn theme-tab-btn ${activeThemeTab===3?'active':''}" data-theme="3" onclick="selectThemeTab(3)">
          Theme 3 (5)
        </button>
        <button class="tab-btn theme-tab-btn ${activeThemeTab===4?'active':''}" data-theme="4" onclick="selectThemeTab(4)">
          Theme 4 (6)
        </button>
        <button class="tab-btn theme-tab-btn ${activeThemeTab===5?'active':''}" data-theme="5" onclick="selectThemeTab(5)">
          Theme 5 (4)
        </button>
        <button class="tab-btn theme-tab-btn ${activeThemeTab===6?'active':''}" data-theme="6" onclick="selectThemeTab(6)">
          Theme 6 (10)
        </button>
        <button class="tab-btn theme-tab-btn ${activeThemeTab==='all'?'active':''}" data-theme="all" onclick="selectThemeTab('all')">
          All Themes (33)
        </button>
      </div>

      <!-- Active Theme Summary Banner -->
      <div id="active-theme-banner" style="display:flex; align-items:center; justify-content:space-between; padding: 6px 14px; background:var(--brand-subtle); border: 1px solid var(--brand-light); border-radius: 8px; margin-bottom: 8px;">
        <div>
          <span id="active-theme-text" style="font-size:14px; font-weight:700; color:var(--brand); display:block; line-height:1.25">
            ${getThemeTabTitle(activeThemeTab)}
          </span>
          <span style="font-size:12px; color:var(--muted)">Sequence preserves exact university roster order from Excel</span>
        </div>
        <span id="active-theme-count" class="tag" style="background:#ffffff; color:var(--brand); border-color:var(--brand); font-weight:700; font-size:13px; padding:3px 10px">
          ${getThemeTabCount(activeThemeTab)} Projects
        </span>
      </div>

      <div class="tablewrap" style="max-height: calc(100vh - 290px); overflow-y: auto;">
        <table class="roster compact-roster" id="hod-projects-table">
          <thead style="position: sticky; top: 0; z-index: 10;">
            <tr>
              <th style="padding: 10px 14px; font-size: 13px;">Project Title</th>
              <th style="width:170px; padding: 10px 14px; font-size: 13px;">Guide</th>
              <th style="width:230px; padding: 10px 14px; font-size: 13px;">Team Members</th>
              <th style="width:105px; text-align:center; padding: 10px 14px; font-size: 13px;">Team No.</th>
              <th style="width:160px; text-align:center; padding: 10px 14px; font-size: 13px;">Project Portfolio</th>
            </tr>
          </thead>
          <tbody id="hod-project-rows">
            ${hodProjectRows()}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function openRosterTeam(id){openTeamPortfolio(id)}
function saveTeamDetails(){if(!isAdmin())return;const topic=$('#team-topic')?.value?.trim()||activeTeam().topic;state.repo=$('#repo')?.value?.trim()||state.repo;activeTeam().topic=topic;save();toast('Project details saved.');}
function teamStatus(t){return t.id===state.activeTeamId?state:state.workspaces[t.id]||{status1:'Draft',status2:'Locked'}}
function facultyCards(){return facultyNames().map(name=>{const teams=state.teams.filter(t=>t.faculty===name);return `<div class="faculty-card">${avatar({name})}<div><h3>${esc(name)}</h3><p class="mini">Faculty guide · CS AI · ${teams.length} team${teams.length===1?'':'s'}</p><p class="mini">${teams.map(t=>'Team '+esc(t.id)).join(' · ')||'No teams assigned'}</p></div></div>`}).join('')}
function allocationForm(){return `<section class="card"><h2>Team guide allocation</h2><p>Faculty Admin coordinates guide assignments under the CS AI HOD.</p><label for="allocate-team">Team</label><select id="allocate-team">${state.teams.map(t=>`<option value="${esc(t.id)}">Team ${esc(t.id)} · ${esc(t.title)}</option>`).join('')}</select><label for="allocate-guide">Faculty guide</label><select id="allocate-guide">${facultyNames().map(n=>`<option>${esc(n)}</option>`).join('')}</select><button class="btn" style="margin-top:16px" onclick="allocateGuide()">Save allocation</button></section>`}
function facultyAdminPanel(){return heading('Coordinate faculty. Support every team.','CS AI Faculty Admin · under '+esc(state.department.hod))+`<div class="grid"><div>${allocationForm()}<section class="card"><h2>Faculty directory</h2>${facultyCards()}</section></div><section class="card"><h2>Department ownership</h2><p><strong>Department:</strong> CS AI</p><p><strong>HOD:</strong> ${esc(state.department.hod)}</p><p><strong>Faculty Admin:</strong> ${esc(state.department.facultyAdmin)}</p><div class="notice">Faculty Admin manages guide allocations. The assigned Faculty guide reviews and approves submissions. Admin imports the complete Excel roster.</div><button class="btn secondary" onclick="go('Department')">View all CS AI teams →</button></section></div>`}
function allocateGuide(){if(!['Admin','Faculty Admin'].includes(state.role))return;const t=state.teams.find(t=>t.id===$('#allocate-team').value),name=$('#allocate-guide').value;if(!t||!facultyNames().includes(name))return;save();t.faculty=name;if(t.id===state.activeTeamId)state.guide=name;if(state.workspaces[t.id])state.workspaces[t.id].guide=name;save();render();toast('CS AI guide allocation saved.')}
let importPreview=null;
function adminPanel(){return heading('CS AI · Administration','Import the department roster, assign guides and manage department ownership.',`<span class="tag">ADMIN PANEL</span>`)+`<div class="grid"><div><section class="card"><h2>Import complete Excel roster</h2><p>One row per team, with four member names and USNs, faculty, topic and project title.</p><div class="actions"><a class="btn secondary" href="CS-AI-Roster-Template.xlsx" download>↓ Excel template with dummy teams</a><button class="btn secondary" onclick="exportRoster()">Export current roster (CSV)</button></div><label for="roster-file">Excel / CSV file</label><input id="roster-file" type="file" accept=".xlsx,.xls,.csv"><p class="mini">Files stay in this browser. Up to 10 MB and 2,000 team rows. Macros and formulas are never executed.</p><button class="btn" onclick="readRosterFile()">Read & validate file →</button><div id="import-result" role="status">${importPreview?previewHTML():''}</div><details style="margin-top:18px"><summary>Required columns and import rules</summary><p class="mini">Team ID, Faculty Name, Topic, Project Title, Member 1 Name, Member 1 USN … Member 4 Name, Member 4 USN. Member 1 is Team Lead. Department, HOD and Faculty Admin are optional columns; blank values use the current CS AI settings. Non-CS-AI departments are rejected. Only sheets with recognized team columns are read. Existing Team IDs are updated; new IDs are added. Other teams and their saved work are preserved.</p></details></section>${allocationForm()}</div><div><section class="card"><h2>One department. One HOD.</h2><label for="department-name">Department</label><input id="department-name" value="CS AI" disabled><label for="hod-name">CS AI HOD name</label><input id="hod-name" value="${esc(state.department.hod)}"><label for="faculty-admin-name">Faculty Admin name</label><input id="faculty-admin-name" value="${esc(state.department.facultyAdmin)}"><button class="btn secondary" style="margin-top:16px" onclick="saveDepartmentOwner()">Save department ownership</button><p class="mini">HOD and Faculty Admin names are placeholders until you enter the real names or import them.</p></section><section class="card"><h2>Faculty directory</h2>${facultyCards()}</section><section class="card"><h2>Department records</h2><p>${state.teams.length} teams · ${state.teams.length*4} students · CS AI</p><button class="btn secondary" onclick="go('Department')">Open complete roster →</button></section></div></div>`}
function saveDepartmentOwner(){if(state.role!=='Admin')return;const hod=$('#hod-name').value.trim(),facultyAdmin=$('#faculty-admin-name').value.trim();if(!hod||!facultyAdmin)return toast('Enter both the HOD and Faculty Admin names.');state.department={name:'CS AI',hod,facultyAdmin};state.teams.forEach(t=>{t.hod=hod;t.facultyAdmin=facultyAdmin});save();render();toast('All CS AI teams now report to the saved department owners.')}
const normalHeader=s=>String(s??'').toLowerCase().replace(/[^a-z0-9]/g,'');
function headerKey(label){const k=normalHeader(label),aliases={teamid:'id',teamno:'id',teamnumber:'id',team:'id',department:'department',dept:'department',hod:'hod',hodname:'hod',facultyadmin:'facultyAdmin',facultyadminname:'facultyAdmin',facultyadministrator:'facultyAdmin',facultyname:'faculty',faculty:'faculty',guide:'faculty',guidename:'faculty',facultyguide:'faculty',topic:'topic',theme:'topic',projecttopic:'topic',projecttitle:'title',title:'title',projectname:'title'};if(aliases[k])return aliases[k];const m=k.match(/^(?:member|student|teammember)([1-4])(name|usn)$/)||k.match(/^(name|usn)([1-4])$/);if(m)return /^\d$/.test(m[1])?'member'+m[1]+m[2]:'member'+m[2]+m[1];return null}
const isCSAI=s=>['csai','computerscienceai','computerscienceandartificialintelligence','computerscienceartificialintelligence','cseai','csaidepartment'].includes(normalHeader(s));
function parseRoster(workbook){
 const errors=[],teams=[],skipped=[];let found=false;
 for(const name of workbook.SheetNames){const sheet=workbook.Sheets[name];if(sheet['!ref']){const r=XLSX.utils.decode_range(sheet['!ref']);if(r.e.r>10000||r.e.c>200){errors.push(`Sheet ${name}: too large; limit 10,001 worksheet rows and 201 columns.`);continue}}
 const rows=XLSX.utils.sheet_to_json(sheet,{header:1,defval:'',raw:false,blankrows:true});let head=-1,keys=[];
 for(let i=0;i<Math.min(rows.length,30);i++){const candidate=rows[i].map(headerKey);if(candidate.includes('id')&&candidate.includes('title')){head=i;keys=candidate;break}}
 if(head<0){skipped.push(name);continue}found=true;
 const needed=['id','faculty','topic','title',...Array.from({length:4},(_,i)=>['member'+(i+1)+'name','member'+(i+1)+'usn']).flat()];const missing=needed.filter(k=>!keys.includes(k));if(missing.length){errors.push(`Sheet ${name}: missing columns ${missing.join(', ')}.`);continue}
 const duplicateKeys=keys.filter((k,i)=>k&&keys.indexOf(k)!==i);if(duplicateKeys.length){errors.push(`Sheet ${name}: duplicate recognized column(s): ${[...new Set(duplicateKeys)].join(', ')}.`);continue}
 for(let i=head+1;i<rows.length;i++){const row=rows[i];if(!row.some(v=>String(v).trim()))continue;const obj={};keys.forEach((key,j)=>{if(key)obj[key]=String(row[j]??'').trim()});if(!Object.values(obj).some(v=>v.trim()))continue;const at=`${name}, row ${i+1}`;if(needed.some(k=>!obj[k])){errors.push(`${at}: complete all four names/USNs, team ID, faculty, topic and title.`);continue}if(obj.department&&!isCSAI(obj.department)){errors.push(`${at}: department must be CS AI.`);continue}let id=obj.id.replace(/^team[\s-]*/i,'').trim();if(/^\d+$/.test(id))id=String(Number(id)).padStart(2,'0');if(!/^[A-Za-z0-9_-]{1,30}$/.test(id)){errors.push(`${at}: Team ID must contain only letters, digits, hyphens or underscores (max 30).`);continue}const team={id,department:'CS AI',hod:obj.hod||state.department.hod,facultyAdmin:obj.facultyAdmin||state.department.facultyAdmin,faculty:obj.faculty,topic:obj.topic,title:obj.title,members:Array.from({length:4},(_,j)=>({name:obj['member'+(j+1)+'name'],usn:obj['member'+(j+1)+'usn'].toUpperCase()})),sample:false,source:at};if(Object.values(obj).some(v=>v.length>3000)){errors.push(`${at}: one or more fields exceed 3,000 characters.`);continue}team.sample=team.members.every(m=>m.usn.startsWith('DEMO-'));teams.push(team)}
 }
 if(!found)errors.push('No team sheet found. Use the downloadable template with Team ID and Project Title headers.');if(teams.length>2000)errors.push('Maximum 2,000 teams per import.');
 const ids=new Set();teams.forEach(t=>{const key=t.id.toLowerCase();if(ids.has(key))errors.push(`${t.source}: duplicate Team ID ${t.id}.`);ids.add(key)});
 const incomingIds=new Set(teams.map(t=>t.id.toLowerCase())),merged=[...state.teams.filter(t=>!incomingIds.has(t.id.toLowerCase())),...teams],usns=new Map();merged.forEach(t=>t.members.forEach(m=>{const key=m.usn.toUpperCase();if(usns.has(key))errors.push(`Duplicate USN ${m.usn}: teams ${usns.get(key)} and ${t.id}.`);else usns.set(key,t.id)}));
 const hods=[...new Set(teams.map(t=>t.hod))],admins=[...new Set(teams.map(t=>t.facultyAdmin))];if(hods.length>1)errors.push('All rows must have the same CS AI HOD.');if(admins.length>1)errors.push('All rows must have the same CS AI Faculty Admin.');
 if(!teams.length&&!errors.length)errors.push('No populated team records found.');return {teams,errors,skipped,hod:hods[0],facultyAdmin:admins[0]};
}
async function readRosterFile(){if(state.role!=='Admin')return;const file=$('#roster-file').files[0];if(!file)return toast('Choose an Excel or CSV file first.');if(!/\.(xlsx|xls|csv)$/i.test(file.name)||file.size>10*1024*1024)return toast('Choose .xlsx, .xls or .csv under 10 MB.');try{if(typeof XLSX==='undefined')throw Error('Excel library unavailable. Reload the page.');const wb=XLSX.read(await file.arrayBuffer(),{type:'array',cellFormula:false,cellHTML:false,cellStyles:false,bookVBA:false});importPreview=parseRoster(wb);importPreview.filename=file.name;$('#import-result').innerHTML=previewHTML()}catch(e){importPreview=null;$('#import-result').textContent='Could not read this file: '+e.message}}
function previewHTML(){if(!importPreview)return '';const p=importPreview;return `<div class="notice" style="margin-top:18px"><strong>${esc(p.filename||'Workbook')} · ${p.teams.length} team rows · ${p.errors.length} validation errors</strong><p class="mini">${p.skipped.length?'Skipped sheets without team headers: '+esc(p.skipped.join(', ')):''}</p>${p.errors.length?`<ul>${p.errors.slice(0,30).map(e=>`<li>${esc(e)}</li>`).join('')}</ul>${p.errors.length>30?'<p>Only the first 30 errors are shown.</p>':''}<p>No changes saved. Correct the file and read it again.</p>`:`<p>Ready to add ${p.teams.filter(t=>!state.teams.some(x=>x.id.toLowerCase()===t.id.toLowerCase())).length} teams and update ${p.teams.filter(t=>state.teams.some(x=>x.id.toLowerCase()===t.id.toLowerCase())).length} existing teams. Department: CS AI · HOD: ${esc(p.hod)} · Faculty Admin: ${esc(p.facultyAdmin)}</p><div class="tablewrap"><table><thead><tr><th>Team</th><th>Faculty</th><th>Project title / Topic</th><th>Four members / USN</th></tr></thead><tbody>${p.teams.slice(0,10).map(t=>`<tr><td>${esc(t.id)}</td><td>${esc(t.faculty)}</td><td>${esc(t.title)}<p class="mini">${esc(t.topic)}</p></td><td>${t.members.map(m=>esc(m.name)+' · '+esc(m.usn)).join('<br>')}</td></tr>`).join('')}</tbody></table></div>${p.teams.length>10?'<p>Preview shows the first 10 teams; all validated records will import.</p>':''}<button class="btn" onclick="commitRosterImport()">Import ${p.teams.length} validated teams</button>`}</div>`}
function commitRosterImport(){if(state.role!=='Admin'||!importPreview||importPreview.errors.length)return;syncTeam();const backup=clone(state);try{const p=importPreview;state.department={name:'CS AI',hod:p.hod,facultyAdmin:p.facultyAdmin};p.teams.forEach(incoming=>{const old=state.teams.find(t=>t.id.toLowerCase()===incoming.id.toLowerCase()),t=clone(incoming);delete t.source;if(old){t.id=old.id;const w=state.workspaces[old.id];if(w){w.members=t.members.map((m,i)=>({...w.members[i],...m}));w.guide=t.faculty;w.forms[1].title=t.title}Object.assign(old,t)}else{state.teams.push(t);state.workspaces[t.id]=newTeamWorkspace(t)}});state.teams.forEach(t=>{t.hod=p.hod;t.facultyAdmin=p.facultyAdmin});const active=state.teams.find(t=>t.id===state.activeTeamId),w=state.workspaces[active.id];workspaceKeys.forEach(k=>delete state[k]);Object.assign(state,clone(w));state.guide=active.faculty;state.members=state.members.map((m,i)=>({...m,...active.members[i]}));state.forms[1].title=active.title;if(!save()){state=backup;return}const count=p.teams.length;importPreview=null;render();toast(`Imported ${count} teams. CS AI roster saved in this browser.`)}catch(e){state=backup;toast('Import was not saved: '+e.message)}}
function rosterMatrix(){const h=['Department','HOD','Faculty Admin','Team ID','Faculty Name','Topic','Project Title',...Array.from({length:4},(_,i)=>['Member '+(i+1)+' Name','Member '+(i+1)+' USN']).flat()];return [h,...state.teams.map(t=>['CS AI',state.department.hod,state.department.facultyAdmin,t.id,t.faculty,t.topic,t.title,...t.members.flatMap(m=>[m.name,m.usn])])]}
function exportRoster(){if(!['Admin','Faculty Admin'].includes(state.role))return;save();const matrix=rosterMatrix(),csv=matrix.map(r=>r.map(v=>'"'+String(v).replace(/^[=+@-]/,"'$&").replace(/"/g,'""')+'"').join(',')).join('\r\n'),url=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='CS-AI-Complete-Roster.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
save();render();
