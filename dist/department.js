/* One CSE(AI) department; local roster import and isolated per-team workspaces. */
const workspaceKeys=['members','guide','forms','repo','stage','unlocked','status0','status1','status2','status3','feedback','score','reviews','questions','answers','activities','messages','mentorMessages','media','questionStage','questionSnapshot','vivaSubmissions'];
const clone=x=>JSON.parse(JSON.stringify(x));
function newTeamWorkspace(team){const w=initial();Object.assign(w,{media:[],messages:[],mentorMessages:[],reviews:{},vivaRecords:[]});w.members=team.members.map((m,i)=>({...m,role:i===0?'Team Lead':'Team Member',github:'https://github.com',skills:'Add skills',contribution:'Add individual responsibilities'}));w.guide=team.faculty;w.forms[1]={title:team.title,problem:'',users:'',research:'',objectives:'',solution:'',success:'',evidence:''};w.forms[2]={functional:'',nonfunctional:'',architecture:'',implementation:'',testing:'',results:'',reflection:'',evidence:''};w.activities=[{text:'CSE(AI) team workspace created',time:new Date().toLocaleString()}];const result={};workspaceKeys.forEach(k=>{if(w[k]!==undefined)result[k]=w[k]});return result}
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
    "excel_order": 5
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
    "excel_order": 6
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
    "excel_order": 7
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
    "excel_order": 10
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
    "excel_order": 11
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
    "excel_order": 12
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
    "excel_order": 13
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
    "excel_order": 14
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
    "excel_order": 15
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
    "excel_order": 16
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
    "excel_order": 17
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
    "excel_order": 18
  },
  {
    "id": "B-12",
    "faculty": "Ms. Sadaf Anjum Savanur",
    "topic": "Theme 4: Networked Systems and Tools",
    "theme_no": 4,
    "theme_name": "Networked Systems and Tools",
    "title": "HTTP Proxy Server with In-Memory Caching",
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
    "title": "Smart Campus Lab and Resource Optimizer",
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
  if(!state.department){state.department={name:'CSE(AI)',hod:'CSE(AI) HOD',facultyAdmin:'CSE(AI) Faculty Admin'}}
  state.department.name = 'CSE(AI)';
  if(state.department?.hod) state.department.hod = state.department.hod.replace(/\s*\(demo\)/gi, '');
  if(state.department?.facultyAdmin) state.department.facultyAdmin = state.department.facultyAdmin.replace(/\s*\(demo\)/gi, '');
  const seeds=seedTeams();
  if(!state.teams||state.teams.length<33||state.excelVersion!==4){
    state.teams=seeds;
    state.excelVersion=4;
    state.activeTeamId=state.teams.some(t=>t.id===state.activeTeamId)?state.activeTeamId:'A-03';
    state.workspaces=state.workspaces||{};
    state.facultyAccount=state.facultyAccount||'Mr. Amit Kachavimath';
    state.teams.forEach(t=>{
      t.department='CSE(AI)';t.hod=state.department.hod;t.facultyAdmin=state.department.facultyAdmin;
      if(!state.workspaces[t.id])state.workspaces[t.id]=newTeamWorkspace(t);
    });
  }
  if(state.teams && state.teams.length >= 33){
    const orderMap = {};
    seeds.forEach(s => { orderMap[s.id] = s.excel_order; });
    state.teams.forEach(t => {
      if(orderMap[t.id]) t.excel_order = orderMap[t.id];
    });
    state.teams.sort((a,b) => (a.excel_order || 0) - (b.excel_order || 0));
  }
  state.version=3;
  if(state.members) state.members.forEach(m=>delete m.share);
  state.facultyDirectory=state.facultyDirectory||[];

  const t08Forms={
    0:{
      title:'Large-Scale Dataset Profiling & Data Quality Engine',
      problem:'Modern data engineering pipelines ingest multi-gigabyte semi-structured datasets (CSV, JSON, Parquet) from heterogeneous sources, leading to critical downstream ML model failures and dashboard inaccuracies caused by schema divergence, silent type casting, duplicate records, missing values, and undetected statistical outliers. Traditional profiling libraries (such as pandas-profiling) consume >4x dataset size in RAM and lack automated, reproducible quality remediation reports with verifiable audit trails.',
      objectives:'1. Build high-throughput streaming and chunked dataset ingestion supporting CSV, JSON, and Parquet with automated schema inference.\n2. Implement algorithmic profiling for data completeness, statistical distributions (mean, median, IQR), duplicate row detection, and outlier identification.\n3. Enforce deterministic data quality constraint validation rules with severity classifications (Critical, Warning, Info).\n4. Provide an interactive visual dashboard for dataset health scoring and generate verifiable multi-format compliance reports (HTML, PDF, JSON).',
      users:'Data Engineers, ML Practitioners, Data Quality Analysts, Academic Project Guides, and Governance Auditors.',
      baseline:'Benchmarked against pandas-profiling / ydata-profiling and Great Expectations. Heavy Python runtime overhead (>4x RAM), high duplicate detection latency on 1M+ records, and complex setup were identified as key limitations. Our approach introduces lightweight streaming chunk passes, hash-based deduplication, and single-pass summary statistics with copy-on-write memory safety.',
      scope:'In-Scope: Ingestion of structured & tabular datasets up to 10GB; automated schema profiling; rule-based quality constraint checks; statistical anomaly detection; interactive visual health scoring; PDF/Excel report export.\nOut-of-Scope: Distributed Spark cluster management; live real-time video/audio stream processing; automatic destructive database schema alteration.',
      courses:'• DAA (CSAI 301): Hash-based deduplication & streaming quantile algorithms\n• OS (CSAI 302): Memory-mapped chunked I/O & asynchronous concurrency\n• Software Engineering (CSAI 303): Modularity, REST API contract design, test coverage\n• Probability & Statistics (CSAI 304): Descriptive statistics, distribution fitting, IQR outlier detection\n• Database Systems (CSAI 305): Schema validation, ACID copy-on-write consistency\n• Machine Learning (CSAI 306): Feature distribution drift detection & anomaly screening',
      engines:'• E1: Stream Ingestion & Schema Profiler Engine\n• E2: Statistical & Distribution Analysis Engine\n• E3: Deterministic Data Quality Rules Engine\n• E4: Remediation, Revalidation & Audit Reporting Engine'
    },
    1:{
      functional:'FR-01: Ingestion & Format Parsing (CSV, JSON, Parquet streaming chunks)\nFR-02: Automated Schema Profiling (column types, nullability, uniqueness)\nFR-03: Statistical Distribution Metrics (mean, median, variance, skewness, quantiles)\nFR-04: Outlier Detection (Tukey IQR method & modified Z-score)\nFR-05: Duplicate Record Identification (multi-column hash-based deduplication)\nFR-06: Custom Rule Engine (user-defined assertions, regex patterns, range checks)\nFR-07: Dataset Health Scoring (0–100 weighted quality index across 6 dimensions)\nFR-08: Copy-on-Write Remediation (immutable source with rollback safety)\nFR-09: Multi-Format Report Generation (interactive HTML dashboard, PDF, Excel summary)',
      nonfunctional:'NFR-01 (Latency): Profile 1M rows (100MB CSV) in < 15 seconds on consumer hardware\nNFR-02 (Memory Bound): Peak RAM usage bounded within 2.5x chunk buffer (streaming memory ceiling < 500MB)\nNFR-03 (Deduplication Accuracy): 100% precision & recall on exact duplicate detection\nNFR-04 (Rule Throughput): Evaluate 50 constraint rules on 100k rows in < 1.2 seconds\nNFR-05 (Security & Isolation): Zero unauthorized data leakage; zero telemetry of customer data rows\nNFR-06 (Portability): Cross-platform execution across Linux, Windows, and macOS without native dependencies\nNFR-07 (Reliability): Graceful handling of malformed records with quarantine logging without pipeline crash',
      architecture:'Modular local-first architecture: Presentation Tier (Semantic HTML5, CSS design tokens, Chart.js visualizers) → API Gateway / Coordinator (FastAPI asynchronous router with schema validation) → Core Execution Engine (Python 3.11 streaming chunk processor, NumExpr, DAA hash index) → Local-First Persistence Tier (Browser IndexedDB for media/binary evidence, LocalStorage for state, and immutable GitHub repository versioning).',
      workflow:'Phase 01: Dataset Ingestion & Chunk Buffering → Phase 02: Schema Inference & Completeness Analysis → Phase 03: Statistical Distribution & Outlier Screening → Phase 04: Duplicate Detection & Constraint Checking → Phase 05: Aggregate Health Scoring & Copy-on-Write Remediation → Phase 06: Multi-Format Audit Report Generation & Export.',
      techstack:'Frontend: HTML5 Semantic, Vanilla JavaScript ES2022, CSS3 Design Tokens, Chart.js & SVG Visualizers.\nBackend/Engine: Python 3.11, FastAPI, Pandas 2.x (Arrow backend), NumPy / SciPy, NumExpr.\nStorage: Browser IndexedDB (Media & binary evidence), LocalStorage JSON state, Git & GitHub version control.\nReporting & Verification: Local Ollama LLM daemon (Qwen 3:4b / Mistral), WeasyPrint PDF generator, SheetJS / openpyxl.',
      constraints:'Hardware: Standard commodity workstation with min 8GB RAM and quad-core CPU. Software: Modern browser with ES2022 & IndexedDB support; Python 3.10+ runtime. Operational: Zero external cloud reliance for data processing to maintain strict privacy compliance.'
    },
    2:{
      implementation:'The core engine utilizes chunked streaming with PyArrow memory mapping to prevent OOM errors on large files. Outlier screening implements Tukey\'s IQR rule: Q1 - 1.5*IQR to Q3 + 1.5*IQR computed in a single pass. Duplicate detection employs 64-bit MurmurHash3 streaming fingerprints across composite key sets for O(N) duplicate discovery. All data remediation operations adhere strictly to Copy-on-Write (CoW) semantics, producing clean derived datasets while keeping raw input records completely immutable.',
      modules:'1. ProfilerModule (chunk ingestion, null counting, optimistic type inference)\n2. StatsEngine (mean, median, standard deviation, quartiles, skewness)\n3. AnomalyDetector (IQR outlier filter, regex pattern validator)\n4. Deduplicator (hash index bucket, duplicate identifier)\n5. RemediationPipeline (copy-on-write transform, quarantine log generator)\n6. ExportEngine (PDF audit trail, Excel workbook builder)',
      repo:'https://github.com/topics/data-quality-engine',
      challenges:'Challenge 1: High memory footprint when computing exact medians across millions of rows without loading all data into RAM. Resolved by using t-digest approximate streaming quantiles with < 0.5% relative error.\nChallenge 2: Mixed-type columns causing parser failure. Resolved by implementing two-phase optimistic type inference with fallback to string quarantine.'
    },
    3:{
      testing:'Comprehensive acceptance test suite covering REQ-01 through REQ-08. Testing methodology includes unit tests for individual engine functions, integration tests on synthetic 100k, 500k, and 1M row benchmarks, and edge-case fuzzing with null-heavy, corrupt, and wide datasets (100+ columns).',
      test_results:'REQ-01 (Ingestion): PASS on 100MB CSV and JSON lines in 8.4s.\nREQ-02 (Schema Inference): PASS with 100% correct type assignment across 24 mixed columns.\nREQ-03 (IQR Outliers): PASS; verified against R boxplot baseline with 0 error.\nREQ-04 (Deduplication): PASS; accurately identified 14,200 duplicate rows in 1M row dataset in 3.1s.\nREQ-05 (Rule Engine): PASS; all 50 custom assertions evaluated within 820ms.\nREQ-06 (Copy-on-Write): PASS; original raw file hash preserved identically (SHA-256 verified).\nREQ-07 (Health Score): PASS; score accurately reflected weighted penalty deductions.\nREQ-08 (PDF Export): PASS; generated 12-page comprehensive audit PDF in 1.4s.',
      metrics:'• Ingestion & Profiling Latency: 8.4s for 100MB (Target: < 15s) - PASSED\n• Peak Memory Usage: 312MB on 100MB dataset (Target: < 500MB) - PASSED\n• Duplicate Detection Precision/Recall: 100% / 100% - PASSED\n• Rule Evaluation Throughput: 122,000 rows/second (Target: > 80,000 rows/s) - PASSED',
      evaluation:'The engine successfully achieves sub-15s profiling on 100MB datasets with zero OOM crashes. Current limitation is single-node throughput limit on >10GB files. Future enhancements include multi-threaded chunk processing via Rust/Polars native bindings and automated drift detection across chronological dataset snapshots.'
    }
  };

  const t08=state.teams?.find(t=>t.id==='A-08'||t.id==='08');
  if(t08){
    t08.faculty='Mrs. Sneha Varur';t08.topic='Data Engineering & Quality Engines';t08.title='Large-Scale Dataset Profiling & Data Quality Engine';
    t08.members=[{name:'Anupriya Savant',usn:'01FE24BCI046',role:'Team Lead · Full-stack & Profiling Engine',skills:'Full-Stack · Schema Profiling',contribution:'Lead architecture modeling, ingestion pipeline, and full-stack integration.'},{name:'Pavitra Jalibenchi',usn:'01FE24BCI049',role:'Core Member · Anomaly & Duplicate Detection',skills:'DAA · Hash Deduplication',contribution:'Duplicate row detection algorithms and data consistency constraint rules.'},{name:'Anushree Angadi',usn:'01FE24BCI050',role:'Core Member · Statistical Analysis & Outliers',skills:'Probability & Stats · IQR Outliers',contribution:'Descriptive statistics, distribution modeling, and IQR outlier screening.'},{name:'Sahana Awaradi',usn:'01FE24BCI030',role:'Core Member · Revalidation & Reporting',skills:'Data Integrity · PDF/Excel Export',contribution:'Copy-on-write remediation, revalidation pipeline, and multi-format report exports.'}];
    state.workspaces=state.workspaces||{};
    if(!state.workspaces['08'])state.workspaces['08']=newTeamWorkspace(t08);
    state.workspaces['08'].guide='Mrs. Sneha Varur';
    state.workspaces['08'].members=t08.members;
    state.workspaces['08'].forms=clone(t08Forms);
    if(state.activeTeamId==='08'){
      state.guide='Mrs. Sneha Varur';
      state.members=t08.members;
      state.forms=clone(t08Forms);
    }
  }

  const t03=state.teams?.find(t=>t.id==='A-03'||t.id==='03');
  if(t03){
    t03.title = 'Smart Campus Lab and Resource Optimizer';
    t03.faculty = 'Mr. Amit Kachavimath';
    if(typeof STATIC_TEAMS !== 'undefined' && STATIC_TEAMS['03']){
      t03.title = STATIC_TEAMS['03'].title || t03.title;
      t03.faculty = STATIC_TEAMS['03'].faculty || t03.faculty;
      t03.members = STATIC_TEAMS['03'].members.map(m=>({name:m.name,usn:m.usn}));
    }
    state.workspaces = state.workspaces || {};
    if(!state.workspaces[t03.id]) state.workspaces[t03.id] = newTeamWorkspace(t03);
    state.workspaces[t03.id].guide = t03.faculty;
    state.workspaces[t03.id].members = t03.members;
    if(state.activeTeamId === t03.id && state.forms && state.forms[1]){
      state.forms[1].title = t03.title; if(state.forms[0]) state.forms[0].title = t03.title;
    }
  }
  const t04=state.teams?.find(t=>t.id==='B-04'||t.title==='Multi-Process Search Engine with Persistent Index');
  if(t04){
    t04.title = 'Multi-Process Search Engine with Persistent Index';
    t04.faculty = 'Ms.Umadevi F M';
    if(typeof STATIC_TEAMS_DATA !== 'undefined' && (STATIC_TEAMS_DATA['B-04'] || STATIC_TEAMS_DATA['04'])){
      const s04 = STATIC_TEAMS_DATA['B-04'] || STATIC_TEAMS_DATA['04'];
      t04.members = s04.members.map(m=>({name:m.name,usn:m.usn}));
    }
    state.workspaces = state.workspaces || {};
    if(!state.workspaces[t04.id]) state.workspaces[t04.id] = newTeamWorkspace(t04);
    state.workspaces[t04.id].guide = t04.faculty;
    state.workspaces[t04.id].members = t04.members;
  }
  const tb01=state.teams?.find(t=>t.id==='B-01'||t.title.includes('Incremental Build'));
  if(tb01){
    tb01.title = 'Incremental Build & Dependency Resolution Tool';
    tb01.faculty = 'Mr. Dheerajkumar';
    if(typeof STATIC_TEAMS_DATA !== 'undefined' && STATIC_TEAMS_DATA['B-01']){
      const sb01 = STATIC_TEAMS_DATA['B-01'];
      tb01.members = sb01.members.map(m=>({name:m.name,usn:m.usn}));
    }
    state.workspaces = state.workspaces || {};
    if(!state.workspaces[tb01.id]) state.workspaces[tb01.id] = newTeamWorkspace(tb01);
    state.workspaces[tb01.id].guide = tb01.faculty;
    state.workspaces[tb01.id].members = tb01.members;
  }
  const t07=state.teams?.find(t=>t.id==='B-07'||t.title==='Java Compiler & Bytecode Generation Engine'||t.title==='Java Compiler and Bytecode Generation Engine');
  if(t07){
    t07.title = 'Java Compiler and Bytecode Generation Engine';
    t07.faculty = 'Ms.N D Kulenavar';
    if(typeof STATIC_TEAMS_DATA !== 'undefined' && (STATIC_TEAMS_DATA['B-07'] || STATIC_TEAMS_DATA['07'])){
      const s07 = STATIC_TEAMS_DATA['B-07'] || STATIC_TEAMS_DATA['07'];
      t07.members = s07.members.map(m=>({name:m.name,usn:m.usn}));
    }
    state.workspaces = state.workspaces || {};
    if(!state.workspaces[t07.id]) state.workspaces[t07.id] = newTeamWorkspace(t07);
    state.workspaces[t07.id].guide = t07.faculty;
    state.workspaces[t07.id].members = t07.members;
  }
  const ta07=state.teams?.find(t=>t.id==='A-07'||t.title.includes('Network Traffic Monitoring'));
  if(ta07){
    ta07.title = 'Network Traffic Monitoring & Protocol Analysis Tool';
    ta07.faculty = 'Ms. Pooja P Shettar';
    if(typeof STATIC_TEAMS_DATA !== 'undefined' && STATIC_TEAMS_DATA['A-07']){
      const sa07 = STATIC_TEAMS_DATA['A-07'];
      ta07.members = sa07.members.map(m=>({name:m.name,usn:m.usn}));
    }
    state.workspaces = state.workspaces || {};
    if(!state.workspaces[ta07.id]) state.workspaces[ta07.id] = newTeamWorkspace(ta07);
    state.workspaces[ta07.id].guide = ta07.faculty;
    state.workspaces[ta07.id].members = ta07.members;
  }
  const t14=state.teams?.find(t=>t.id==='A-14'||t.title.includes('Mini Kernel')||t.title.includes('Mini -kernel'));
  if(t14){
    t14.title = 'Mini -kernel with process, memory and file management';
    t14.faculty = 'Ms. Arundati Aralimatti';
    if(typeof STATIC_TEAMS_DATA !== 'undefined' && (STATIC_TEAMS_DATA['A-14'] || STATIC_TEAMS_DATA['14'])){
      const s14 = STATIC_TEAMS_DATA['A-14'] || STATIC_TEAMS_DATA['14'];
      t14.members = s14.members.map(m=>({name:m.name,usn:m.usn}));
    }
    state.workspaces = state.workspaces || {};
    if(!state.workspaces[t14.id]) state.workspaces[t14.id] = newTeamWorkspace(t14);
    state.workspaces[t14.id].guide = t14.faculty;
    state.workspaces[t14.id].members = t14.members;
  }
  const t06=state.teams?.find(t=>t.id==='A-06'||t.title.includes('Constraint-Based'));
  if(t06){
    t06.title = 'Constraint-Based Academic Timetable Scheduling';
    t06.faculty = 'Mr. Mallikarjun Akki';
    if(typeof STATIC_TEAMS_DATA !== 'undefined' && (STATIC_TEAMS_DATA['A-06'] || STATIC_TEAMS_DATA['06'])){
      const s06 = STATIC_TEAMS_DATA['A-06'] || STATIC_TEAMS_DATA['06'];
      t06.members = s06.members.map(m=>({name:m.name,usn:m.usn}));
    }
    state.workspaces = state.workspaces || {};
    if(!state.workspaces[t06.id]) state.workspaces[t06.id] = newTeamWorkspace(t06);
    state.workspaces[t06.id].guide = t06.faculty;
    state.workspaces[t06.id].members = t06.members;
  }

  const t12=state.teams?.find(t=>t.id==='B-12'||t.title.includes('HTTP Proxy Server'));
  if(t12){
    t12.title = 'HTTP Proxy Server with In-Memory Caching';
    t12.faculty = 'Ms. Sadaf Anjum Savanur';
    if(typeof STATIC_TEAMS_DATA !== 'undefined' && (STATIC_TEAMS_DATA['B-12'] || STATIC_TEAMS_DATA['12'])){
      const s12 = STATIC_TEAMS_DATA['B-12'] || STATIC_TEAMS_DATA['12'];
      t12.members = s12.members.map(m=>({name:m.name,usn:m.usn}));
    }
    state.workspaces = state.workspaces || {};
    if(!state.workspaces[t12.id]) state.workspaces[t12.id] = newTeamWorkspace(t12);
    state.workspaces[t12.id].guide = t12.faculty;
    state.workspaces[t12.id].members = t12.members;
  }
  const t13=state.teams?.find(t=>t.id==='B-13'||t.title.includes('Resilient Multi-Peer'));
  if(t13){
    t13.title = 'Resilient Multi-Peer File Distribution & Recovery Engine';
    t13.faculty = 'Ms. Pooja P Shettar';
    if(typeof STATIC_TEAMS_DATA !== 'undefined' && (STATIC_TEAMS_DATA['B-13'] || STATIC_TEAMS_DATA['13'])){
      const s13 = STATIC_TEAMS_DATA['B-13'] || STATIC_TEAMS_DATA['13'];
      t13.members = s13.members.map(m=>({name:m.name,usn:m.usn}));
    }
    state.workspaces = state.workspaces || {};
    if(!state.workspaces[t13.id]) state.workspaces[t13.id] = newTeamWorkspace(t13);
    state.workspaces[t13.id].guide = t13.faculty;
    state.workspaces[t13.id].members = t13.members;
  }
  const t01=state.teams?.find(t=>t.id==='A-01'||t.title.includes('Mini RDBMS'));
  if(t01){
    t01.title = 'Mini RDBMS Engine with Query Processing & Transaction Support';
    t01.faculty = 'Ms. Jyothi Patil';
    if(typeof STATIC_TEAMS_DATA !== 'undefined' && (STATIC_TEAMS_DATA['A-01'] || STATIC_TEAMS_DATA['01'])){
      const s01 = STATIC_TEAMS_DATA['A-01'] || STATIC_TEAMS_DATA['01'];
      t01.members = s01.members.map(m=>({name:m.name,usn:m.usn}));
    }
    state.workspaces = state.workspaces || {};
    if(!state.workspaces[t01.id]) state.workspaces[t01.id] = newTeamWorkspace(t01);
    state.workspaces[t01.id].guide = t01.faculty;
    state.workspaces[t01.id].members = t01.members;
  }
  const t05=state.teams?.find(t=>t.id==='B-05'||t.title.includes('Persistent Key-Value'));
  if(t05){
    t05.title = 'Persistent Key-Value Storage Engine';
    t05.faculty = 'Ms. Shrushti Gani';
    if(typeof STATIC_TEAMS_DATA !== 'undefined' && (STATIC_TEAMS_DATA['B-05'] || STATIC_TEAMS_DATA['05'])){
      const s05 = STATIC_TEAMS_DATA['B-05'] || STATIC_TEAMS_DATA['05'];
      t05.members = s05.members.map(m=>({name:m.name,usn:m.usn}));
    }
    state.workspaces = state.workspaces || {};
    if(!state.workspaces[t05.id]) state.workspaces[t05.id] = newTeamWorkspace(t05);
    state.workspaces[t05.id].guide = t05.faculty;
    state.workspaces[t05.id].members = t05.members;
  }
  const tb10=state.teams?.find(t=>t.id==='B-10'||t.title.includes('Log Processing'));
  if(tb10){
    tb10.title = 'Large-Scale Log Processing & Analytics Engine';
    tb10.faculty = 'Ms. Umadevi F M';
    if(typeof STATIC_TEAMS_DATA !== 'undefined' && (STATIC_TEAMS_DATA['B-10'] || STATIC_TEAMS_DATA['10'])){
      const sb10 = STATIC_TEAMS_DATA['B-10'] || STATIC_TEAMS_DATA['10'];
      tb10.members = sb10.members.map(m=>({name:m.name,usn:m.usn}));
    }
    state.workspaces = state.workspaces || {};
    if(!state.workspaces[tb10.id]) state.workspaces[tb10.id] = newTeamWorkspace(tb10);
    state.workspaces[tb10.id].guide = tb10.faculty;
    state.workspaces[tb10.id].members = tb10.members;
  }

  [state,...Object.values(state.workspaces||{})].forEach(w=>{
    w.media=w.media||[];w.messages=w.messages||[];w.mentorMessages=w.mentorMessages||[];w.reviews=w.reviews||{};w.questions=w.questions||[];w.answers=w.answers||{};w.activities=w.activities||[];
    w.forms=w.forms||{};
    [0,1,2,3].forEach(s=>{w.forms[s]=w.forms[s]||{}});
  });
}
ensureDepartment();
function activeTeam(){return state.teams.find(t=>t.id===state.activeTeamId)}
function syncTeam(){const team=activeTeam();if(!team)return;team.members=state.members.map(m=>({name:m.name,usn:m.usn}));team.title=state.forms[1]?.title||team.title;team.faculty=state.guide;const w={};workspaceKeys.forEach(k=>{if(state[k]!==undefined)w[k]=clone(state[k])});state.workspaces[team.id]=w}
const saveLocalState=save;
save=function(){ensureDepartment();syncTeam();return saveLocalState()};
function facultyNames(){return [...new Set([...state.teams.map(t=>t.faculty),...state.facultyDirectory.map(f=>f.name)])].sort()}
function visibleTeams(){return state.role==='Faculty'?state.teams.filter(t=>t.faculty===state.facultyAccount):state.role==='Team Lead'?state.teams.filter(t=>t.id===state.activeTeamId):state.teams}
function switchTeam(id){const next=state.teams.find(t=>t.id===id);if(!next||state.role==='Faculty'&&next.faculty!==state.facultyAccount)return toast('This team is not assigned to the selected faculty account.');save();const w=state.workspaces[id]||newTeamWorkspace(next);workspaceKeys.forEach(k=>delete state[k]);Object.assign(state,clone(w));state.activeTeamId=id;state.guide=next.faculty;state.members=state.members.map((m,i)=>({...m,name:next.members[i].name,usn:next.members[i].usn}));state.forms[1].title=next.title;selectedSection='';modal=null;save();render();window.scrollTo(0,0)}
rolePages['Faculty Admin']=['Overview','Department','Team Portfolio'];
iconFor['Faculty Admin']='♙';
currentIdentity=function(){if(state.role==='Faculty Admin')return state.department.facultyAdmin;if(state.role==='Faculty')return state.facultyAccount;if(state.role==='HOD')return state.department.hod;if(state.role==='Admin')return 'CS (AI) Administrator';return state.members[0].name};
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
render=function(){ensureDepartment();if(page==='Faculty Admin')page='Overview';renderWorkspace();const main=$('.main');if(state.role==='Faculty'&&!visibleTeams().length){main.innerHTML=accountStrip()+heading('No teams assigned','This faculty account has no team allocation. Ask Admin or Faculty Admin to allocate a guide.');return}let html=main.innerHTML;if(['Design Journey'].includes(page)||page==='Overview'&&['Team Lead','Faculty'].includes(state.role))html=html.replaceAll('Team 03','Team '+esc(state.activeTeamId)).replaceAll('TEAM 03','TEAM '+esc(state.activeTeamId));html=html.replace('Intelligent Systems & Optimization · Faculty guide:',esc(activeTeam().topic)+' · Faculty guide:').replace('INTELLIGENT SYSTEMS & OPTIMIZATION',esc(activeTeam().topic.toUpperCase()));main.innerHTML=html;if(state.role!=='HOD'&&page!=='Department') main.insertAdjacentHTML('afterbegin',accountStrip());const f=$('#stageform');if(f){f.onsubmit=e=>{e.preventDefault();saveStage(true)};f.oninput=()=>{if(editableStage()){state.forms[state.stage]=state.forms[state.stage]||{};for(const[k,v]of new FormData(f))state.forms[state.stage][k]=v;if(save())$('#savehint').textContent='✓ Draft saved locally · '+new Date().toLocaleTimeString()}}}if(['Team Portfolio','Design Journey','Evidence Library'].includes(page))hydrateMedia();if(page==='Team Portfolio'&&typeof mountPortfolioChat==='function'&&activeTeam()?.id)mountPortfolioChat(activeTeam().id);else if(typeof unmountPortfolioChat==='function')unmountPortfolioChat()};
const teamOverview=overview;
overview=function(){if(state.role==='Faculty Admin')return facultyAdminPanel();return teamOverview()};
function getDomainKnowledge(t){
  const topic=(t.topic||'').toLowerCase(),title=(t.title||'').toLowerCase();
  if(t.id==='08'||title.includes('profiling')||title.includes('data quality')||topic.includes('data engineering')){
    return {
      problem:'Structured datasets frequently suffer from missing values, duplicate records, inconsistent types, invalid formats, and statistically extreme observations. Manual inspection and ad-hoc scripting are error-prone and fail to scale across large tabular files and databases. The proposed project unifies dataset profiling and data-quality assessment into an automated, interactive workflow that preserves the original dataset while applying user-selected corrections strictly to an isolated copy.',
      targetUsers:'Data Analysts, Database Engineers, ML Practitioners, and Academic Researchers.',
      baselineFriction:'Manual data profiling and cleansing consumes up to 60% of data science workflow time with high risk of silent corruption in the original dataset.',
      objectives:'Accept structured tabular datasets and generate structural profiles; detect missing values, duplicates, and type inconsistencies; compute descriptive statistics and flag IQR-based outliers; provide user-guided remediation on decoupled copies; revalidate corrected data and output quality scores and reports.',
      success1:'Completeness & Accuracy: >= 95% detection rate for missing, duplicate, and invalid entries across benchmark test datasets.',
      success2:'Immutability Guarantee: 0 unintended modifications to original input files (100% verified via SHA-256 hash validation).',
      courseIntegration:[
        {course:'Database Management Systems (DBMS)',role:'Dominant',concepts:'Dataset structure, schema discovery, data types, consistency constraints, storage and retrieval.'},
        {course:'Data Structures & Algorithm Analysis (DAA)',role:'Dominant',concepts:'Scanning algorithms, hash-based comparison for duplicate detection, and streaming buffer processing.'},
        {course:'Probability & Statistics',role:'Dominant',concepts:'Descriptive statistics, distributions, missing-value rates, and IQR-based outlier screening.'},
        {course:'Machine Learning',role:'Supporting',concepts:'Anomaly-analysis concepts and interpretation of statistically unusual observations.'},
        {course:'Operating Systems',role:'Supporting',concepts:'File handling, memory buffers, process resource limits, and chunked I/O.'},
        {course:'Web Technologies',role:'Supporting',concepts:'Interactive web dashboard, client-side data visualization, and downloadable report generation.'}
      ],
      conceptualEngines:[
        {id:'E1',name:'Dataset Profiling Engine',desc:'Summarizes rows, columns, data types, null counts, and structural characteristics.'},
        {id:'E2',name:'Completeness & Duplicate Detection',desc:'Identifies missing values, empty strings, and exact duplicate records via hashing.'},
        {id:'E3',name:'Data Validation & Consistency',desc:'Validates configured formats, allowed domain values, type consistency, and constraints.'},
        {id:'E4',name:'Statistical & Anomaly Analysis',desc:'Computes descriptive statistics (mean, min, max, spread) and flags IQR-based outliers.'}
      ],
      scopeIn:[
        'Upload and inspect supported structured/tabular datasets (CSV, tabular files).',
        'Profile datasets and detect missing, duplicate, inconsistent, and invalid values.',
        'Perform basic statistical analysis and flag potential outliers using IQR thresholds.',
        'Display findings on an interactive dashboard, apply user-selected corrections on an isolated copy, revalidate, and produce quality score reports.'
      ],
      scopeOut:[
        'Enterprise-scale multi-cluster distributed deployment (beyond student 3-credit academic scope).',
        'Real-time streaming pipeline integration (excluded from initial batch-analysis scope).',
        'Support for proprietary legacy or unstructured data formats (restricted to structured/tabular data).'
      ],
      feasibilityNotes:'Designed within the 15-week academic semester (3-credit scope). Operates with local file handling, memory management, and zero cloud API cost. Preserves original data via copy-on-write isolation.',
      useCaseImg:'assets/team08_usecase_diagram.jpg',
      ucActor:'User (Data Analyst / End User) & System Administrator',
      ucList:[
        'Upload Dataset (supported structured/tabular formats)',
        'View Dataset Profile (dimensions, columns, types, basic statistics)',
        'View Data Quality Issues (missing, duplicates, invalid, outliers)',
        'Select Issues for Correction (user decision review loop)',
        'Apply Corrections (type casting, duplicate pruning on decoupled copy)',
        'Revalidate Corrected Dataset (iterative quality checks)',
        'View Statistical Analysis & Visualizations (distributions, box plots)',
        'Calculate Quality Score & Export Reports (PDF, Excel, CSV)'
      ],
      uc1:'Upload Dataset & Discover Schema',uc2:'Execute Automated Quality Profiling',uc3:'Select & Apply Guided Corrections',uc4:'Revalidate & Export Quality Report',
      frList:[
        {id:'FR-01',desc:'The system shall allow users to upload datasets in supported structured/tabular formats and ingest data for analysis.',prio:'Mandatory',source:'Automated Ingestion'},
        {id:'FR-02',desc:'The system shall profile the uploaded dataset and provide its structure, dimensions, columns, data types and basic characteristics.',prio:'Mandatory',source:'Automated Profiling'},
        {id:'FR-03',desc:'The system shall detect and report common data-quality issues including missing values, duplicate records, data-type inconsistencies, null values and basic invalid values.',prio:'Mandatory',source:'Quality Anomaly Detection'},
        {id:'FR-04',desc:'The system shall analyze the dataset using basic statistics, such as average, minimum, maximum, and distribution, and identify unusual values (outliers).',prio:'Mandatory',source:'Unified Quality Analysis'},
        {id:'FR-05',desc:'The system shall display the detected issues and allow the user to select which issues should be corrected.',prio:'Mandatory',source:'User Decision Loop'},
        {id:'FR-06',desc:'The system shall automatically apply user-selected corrections, such as correcting supported data types and removing duplicate records, without modifying the original dataset.',prio:'Mandatory',source:'Safe Remediation'},
        {id:'FR-07',desc:'The system shall recheck the corrected dataset and allow the user to perform additional correction rounds until the user chooses to finish and generate the quality report.',prio:'Mandatory',source:'Revalidation'},
        {id:'FR-08',desc:'The system shall provide basic recommendations for suitable corrective actions for detected quality issues.',prio:'Challenge',source:'Recommendation Engine'},
        {id:'FR-09',desc:'The system shall support efficient processing of larger datasets within the defined system resource limits.',prio:'Challenge',source:'Scalability & Performance'}
      ],
      fr1:'FR-01: Multi-Source Dataset Ingestion (CSV, MySQL, PostgreSQL, SQLite) with automatic schema discovery.',
      fr2:'FR-02: Structural Profiling & Completeness Engine scanning missing, null, duplicate, and invalid entries.',
      fr3:'FR-03: Statistical & IQR Anomaly Analysis with user-guided copy-on-write remediation.',
      fr4:'FR-04: Multi-Dimensional Quality Scoring and Export (PDF Report, Excel Sheet, CSV Audit).',
      nfrList:[
        {id:'NFR-01',desc:'The system shall process datasets within the supported size limit without failure under the defined test environment.',cat:'Performance',target:'Successfully process >= 95% of defined test datasets within size limits'},
        {id:'NFR-02',desc:'The system should quickly show the user the progress or result while the dataset is being uploaded and analyzed.',cat:'Performance',target:'Display processing status within 2 seconds of starting long-running operations'},
        {id:'NFR-03',desc:'The system shall preserve the original uploaded dataset without modifying it during quality analysis.',cat:'Reliability / Data Integrity',target:'0 unintended modifications to original input files in test cases'},
        {id:'NFR-04',desc:'The system shall provide understandable quality results to users through the dashboard.',cat:'Usability',target:'User identifies overall score and major issues within 1 minute of viewing'},
        {id:'NFR-05',desc:'The system shall provide consistent results when the same dataset and rules are processed repeatedly.',cat:'Reliability',target:'100% identical results produced on identical input and rules'},
        {id:'NFR-06',desc:'The system shall prevent unauthorized access to uploaded datasets and generated results.',cat:'Security',target:'Unauthorized access attempts are rejected in 100% of security tests'},
        {id:'NFR-07',desc:'The system shall maintain correction results so that users can distinguish the original and corrected datasets.',cat:'Auditability / Reliability',target:'100% of correction sessions preserve original vs. corrected distinction'}
      ],
      nfr1:'NFR-01: Processing Scalability: Complete profiling of 1M row datasets in < 30s.',
      nfr2:'NFR-02: Zero Modification Immutability: 0 unintended changes to source datasets.',
      nfr3:'NFR-03: Deterministic Reliability: 100% repeatable results given identical rules.',
      nfr4:'NFR-04: Usability: Instant visual quality score and major issue breakdown in < 1 min.',
      archImg:'assets/team08_architecture_workflow.png',
      archDesc:'Decoupled 6-phase pipeline connecting multi-source ingestion to statistical profiling, rule-based quality assessment, metric calculation, and web visualization, backed by isolated Metadata Store and Results Database.',
      workflow:['1. Data Input','2. Ingestion & Schema','3. Data Profiling','4. Quality Assessment','5. Metrics & Scoring','6. Dashboard & Output'],
      workflowDesc:[
        'Accepts CSV files and relational database connections (MySQL, PostgreSQL, SQLite) with user configuration for sample size and thresholds.',
        'Reads connection stream, discovers tables/columns/datatypes, and populates Metadata Store with constraints and keys.',
        'Extracts column records, calculates null counts, distinct cardinality, and descriptive summary statistics (min, max, mean, spread).',
        'Runs completeness, uniqueness, validity, and consistency checks; flags duplicate rows, invalid formats, and IQR outliers.',
        'Computes dimension-wise quality percentages and synthesizes composite Data Quality Score (0–100%).',
        'Renders interactive visual dashboard (donut charts, issue frequency bars) and exports downloadable PDF, Excel, and CSV reports.'
      ],
      techGroup2:['Python 3.11','Pandas & Polars (Chunked Processing)','NumPy & SciPy (IQR Outliers)','SQLAlchemy / SQLite Engine'],
      techStorage:['SQLite Metadata Store','Results Database (Anomalies & Scores)','Browser LocalStorage State','Browser IndexedDB (Binary Files)'],
      techReporting:['ReportLab PDF Engine','openpyxl (Excel Report)','CSV Stream Exporter','Chart.js / SVG Visualizer'],
      implDesc:'Chunked stream ingestion reads large files without memory exhaustion. Duplicate rows are detected using MurmurHash3 / MD5 row hashing. Outliers are filtered using the Interquartile Range method (Q1 - 1.5*IQR to Q3 + 1.5*IQR). All remediation transformations write exclusively to a newly allocated dataset instance (Copy-on-Write) while the source file remains strictly read-only.',
      hard1Name:'Dataset Immutability Enforcement (Zero Modification)',
      hard1Desc:'The original dataset file is mounted with read-only permissions and verified with a pre/post SHA-256 hash. Zero byte changes to the original file are tolerated.',
      hard2Name:'Memory Cap & Chunked Stream Bound',
      hard2Desc:'File ingestion allocates a maximum memory buffer of 256 MB by processing in streaming chunks of 10,000 records, preventing out-of-memory errors on large CSV files.',
      testSuite:[
        {req:'REQ-01 · File Ingestion',criteria:'Accepts valid tabular files; rejects unsupported, empty or corrupted files with explicit error.',method:'Upload valid and corrupted CSV test cases; verify clean error response.',obs:'Invalid and empty files rejected in 0.08s with descriptive validation message.'},
        {req:'REQ-02 · Structural Profiling',criteria:'Accurately extracts row count, column count, column names, and data types.',method:'Compare extracted profile metrics with known ground-truth dataset schemas.',obs:'100% schema match across 12 benchmark test datasets.'},
        {req:'REQ-03 · Issue Detection',criteria:'Correctly detects missing values, duplicate rows, type inconsistencies, and nulls.',method:'Execute on synthetic datasets with injected anomalies; compare detected vs ground truth.',obs:'Detected 100% of injected duplicates and 99.4% of missing values.'},
        {req:'REQ-04 · Statistical Analysis & Outliers',criteria:'Computes descriptive stats and accurately identifies values outside IQR fences.',method:'Verify statistical metrics against independently computed SciPy values.',obs:'IQR outlier screening matched independent SciPy benchmark with 100% precision.'},
        {req:'REQ-05 · Quality Scoring',criteria:'Generates multi-dimensional quality score based on defined scoring rules.',method:'Process datasets with known error ratios; verify score against formula.',obs:'Quality score calculated deterministically: 93.5% on department benchmark.'},
        {req:'REQ-06 · Dashboard & Export',criteria:'Renders interactive dashboard and generates downloadable PDF and Excel reports.',method:'Trigger export and verify file readability, schema integrity, and score consistency.',obs:'PDF and Excel reports generated with complete audit trail and charts.'},
        {req:'REQ-07 · Correction Guidance',criteria:'Recommends appropriate remediation actions for detected issues.',method:'Evaluate recommendation relevancy for type casting and deduplication.',obs:'Generated contextual fix suggestions for duplicate records and invalid dates.'},
        {req:'REQ-08 · Scalability & Performance',criteria:'Processes datasets up to 1,000,000 records within defined memory and time limits.',method:'Run stress benchmark on increasing dataset sizes (10k, 100k, 500k, 1M rows).',obs:'1M row dataset profiled in 18.2 seconds within 185 MB RAM footprint.'}
      ],
      tc1Name:'Corrupted & Non-Tabular File Rejection',tc1Obs:'Invalid syntax flagged at byte 0; rejected with 0.04s latency',
      tc2Name:'Hash-Based Duplicate Row Screening',tc2Obs:'1,240 duplicate records flagged with exact line pointers',
      tc3Name:'1,000,000-Row Full Dataset Profiling Stress Run',tc3Obs:'Full structural and statistical profiling completed in 18.2s',
      tc4Name:'Copy-on-Write Immutability SHA-256 Audit',tc4Obs:'Original file SHA-256 hash identical before and after correction rounds',
      metric1Val:'93.5%',metric1Lbl:'Overall Quality Score',
      metric2Val:'0 Changes',metric2Lbl:'Original File Integrity',
      metric3Val:'< 1.8 s',metric3Lbl:'Progress Feedback',
      metric4Val:'100%',metric4Lbl:'Deterministic Output'
    };
  }
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

function parseTableRows(text, type, defaultList){
  if(!text||!text.trim())return defaultList||[];
  const lines=text.split('\n').map(l=>l.trim()).filter(Boolean);
  if(!lines.length)return defaultList||[];
  return lines.map((line,idx)=>{
    if(line.includes('|')){
      const parts=line.split('|').map(p=>p.trim());
      if(type==='FR'){
        const idMatch=parts[0].match(/(?:FR|REQ)?[-_ ]?([0-9]{1,2})/i);
        const id=idMatch?`FR-${idMatch[1].padStart(2,'0')}`:(parts[0]||`FR-${String(idx+1).padStart(2,'0')}`);
        return {id,desc:parts[1]||parts[0],prio:parts[2]||(idx<7?'Mandatory':'Challenge'),source:parts[3]||'Gate 0 S0 Need'};
      }else if(type==='NFR'){
        const idMatch=parts[0].match(/(?:NFR)?[-_ ]?([0-9]{1,2})/i);
        const id=idMatch?`NFR-${idMatch[1].padStart(2,'0')}`:(parts[0]||`NFR-${String(idx+1).padStart(2,'0')}`);
        return {id,desc:parts[1]||parts[0],cat:parts[2]||(idx<2?'Performance':idx===3?'Usability':idx===5?'Security':'Reliability'),target:parts[3]||'Verified in benchmark'};
      }else if(type==='COURSES'){
        return {sl:parts[0]||String(idx+1),course:parts[1]||parts[0],concepts:parts[2]||'Core concepts applied in design',role:parts[3]||(idx<3?'Dominant':'Supporting')};
      }else if(type==='ENGINES'){
        return {id:parts[0]||`E${idx+1}`,engine:parts[0]||`E${idx+1}`,desc:parts[1]||parts[0]};
      }
    }
    const colonIdx=line.indexOf(':');
    if(colonIdx>0&&colonIdx<35){
      const lead=line.substring(0,colonIdx).trim(),desc=line.substring(colonIdx+1).trim();
      if(type==='FR'){
        const idMatch=lead.match(/(?:FR|REQ)?[-_ ]?([0-9]{1,2})/i);
        const num=idMatch?idMatch[1].padStart(2,'0'):String(idx+1).padStart(2,'0');
        const prio=/challenge/i.test(lead)||/challenge/i.test(desc)||idx>=7?'Challenge':'Mandatory';
        const defMatch=(defaultList||[]).find(d=>d.id===`FR-${num}`||d.id===num);
        return {id:`FR-${num}`,desc,prio:defMatch?.prio||prio,source:defMatch?.source||'Automated Profiling & Discovery'};
      }else if(type==='NFR'){
        const idMatch=lead.match(/(?:NFR)?[-_ ]?([0-9]{1,2})/i);
        const num=idMatch?idMatch[1].padStart(2,'0'):String(idx+1).padStart(2,'0');
        let cat='Reliability';
        if(/latency|speed|performance|time/i.test(lead)||/latency|speed|performance/i.test(desc))cat='Performance';
        else if(/security|privacy|leakage|auth/i.test(lead)||/security|privacy/i.test(desc))cat='Security';
        else if(/usability|ui|ux|score/i.test(lead)||/usability|understandable/i.test(desc))cat='Usability';
        else if(/memory|resource|bound/i.test(lead))cat='Resource Bound';
        const defMatch=(defaultList||[]).find(d=>d.id===`NFR-${num}`||d.id===num);
        return {id:`NFR-${num}`,desc,cat:defMatch?.cat||cat,target:defMatch?.target||'Verified under defined test benchmarks'};
      }else if(type==='COURSES'){
        const role=/dominant/i.test(lead)||/dominant/i.test(desc)||idx<3?'Dominant':'Supporting';
        return {sl:String(idx+1),course:lead.replace(/^[•\-\*]\s*/,''),concepts:desc,role};
      }else if(type==='ENGINES'){
        return {id:lead.replace(/^[•\-\*]\s*/,''),engine:lead.replace(/^[•\-\*]\s*/,''),desc};
      }
    }
    const cleanLine=line.replace(/^[•\-\*0-9.]+\s*/,'');
    if(type==='FR'){
      const defMatch=(defaultList||[])[idx];
      return {id:defMatch?.id||`FR-${String(idx+1).padStart(2,'0')}`,desc:cleanLine||defMatch?.desc||line,prio:defMatch?.prio||(idx<7?'Mandatory':'Challenge'),source:defMatch?.source||'Identified Need (from S0)'};
    }else if(type==='NFR'){
      const defMatch=(defaultList||[])[idx];
      return {id:defMatch?.id||`NFR-${String(idx+1).padStart(2,'0')}`,desc:cleanLine||defMatch?.desc||line,cat:defMatch?.cat||(idx<2?'Performance':idx===3?'Usability':'Reliability'),target:defMatch?.target||'Defined benchmark threshold'};
    }else if(type==='COURSES'){
      const defMatch=(defaultList||[])[idx];
      return {sl:String(idx+1),course:defMatch?.course||cleanLine,concepts:defMatch?.concepts||cleanLine,role:defMatch?.role||(idx<3?'Dominant':'Supporting')};
    }else if(type==='ENGINES'){
      const defMatch=(defaultList||[])[idx];
      return {id:defMatch?.id||`E${idx+1}`,engine:defMatch?.engine||defMatch?.name||cleanLine,desc:defMatch?.desc||cleanLine};
    }
    return {id:String(idx+1),desc:line};
  });
}

function renderRequirementsTable(text, defaultList, type){
  let rows=[];
  if(text&&text.trim()){
    rows=parseTableRows(text,type,defaultList);
  }
  if(!rows.length&&defaultList&&defaultList.length){
    rows=defaultList;
  }
  if(type==='FR'){
    return `<div class="tablewrap" style="margin-top:8px">
      <table class="test-suite-table">
        <thead>
          <tr>
            <th style="width:75px">FR ID</th>
            <th>Requirement Description</th>
            <th style="width:130px">Priority</th>
            <th style="width:200px">Source Need (from S0)</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(fr=>`
            <tr id="portfolio-fr-${esc(fr.id)}">
              <td><span class="req-tag">${esc(fr.id)}</span></td>
              <td style="font-size:12.5px;color:var(--ink);line-height:1.5">${esc(fr.desc)}</td>
              <td><span class="requirement-meta-text">${esc(fr.prio)}</span></td>
              <td style="font-size:11.5px;color:var(--muted)">${esc(fr.source||'Automated Profiling')}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>`;
  }else{
    return `<div class="tablewrap" style="margin-top:8px">
      <table class="test-suite-table">
        <thead>
          <tr>
            <th style="width:85px">NFR ID</th>
            <th>Requirement Description</th>
            <th style="width:160px">Category</th>
            <th style="width:240px">Measurable Target</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map(nfr=>`
            <tr id="portfolio-nfr-${esc(nfr.id)}">
              <td><span class="req-tag">${esc(nfr.id)}</span></td>
              <td style="font-size:12.5px;color:var(--ink);line-height:1.5">${esc(nfr.desc)}</td>
              <td><span class="requirement-meta-text">${esc(nfr.cat||'Reliability')}</span></td>
              <td style="font-size:12px;color:var(--brand);font-weight:600">${esc(nfr.target||'Defined benchmark threshold')}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>`;
  }
}

portfolio=function(){
  const t=activeTeam()||state.teams[0],
        staticTeam = (typeof window !== 'undefined' && window.STATIC_TEAMS_DATA && (
          window.STATIC_TEAMS_DATA[t.id] ||
          (t.id === 'A-03' ? (window.STATIC_TEAMS_DATA['A-03'] || window.STATIC_TEAMS_DATA['03']) : null) ||
          Object.values(window.STATIC_TEAMS_DATA).find(st => st && (st.id === t.id || (st.title && t.title && st.title.toLowerCase().trim() === t.title.toLowerCase().trim())))
        )) || null,
        hasData = Boolean(staticTeam),
        isSmartCampus = (t.id === 'A-03' || t.title === 'Smart Campus Lab and Resource Optimizer' || t.title === 'Smart Campus Lab & Resource Optimizer'),
        st0 = staticTeam?.stage0 || {},
        st1 = staticTeam?.stage1 || {},
        sys = staticTeam?.systemDesign || {},
        f0 = hasData ? (state.forms?.[0] || {}) : {},
        f1 = hasData ? (state.forms?.[1] || {}) : {},
        f2 = hasData ? (state.forms?.[2] || {}) : {},
        f3 = hasData ? (state.forms?.[3] || {}) : {},
        topic = (staticTeam?.theme || t.topic || 'Specialization Theme'),
        themeName = (t.theme_name || (staticTeam?.theme) || topic || '').replace(/^Theme\s*\d+\s*:\s*/i, ''),
        title = (staticTeam?.title || t.title || 'Project Portfolio'),
        guide = (staticTeam?.guide || state.guide || t.faculty || 'Faculty Mentor'),
        repoUrl = safe(staticTeam?.repo || f2.repo || state.repo || t.repo || 'https://github.com'),
        themeNo = (window.lastViewedTheme !== undefined && window.lastViewedTheme !== null) ? window.lastViewedTheme : (t.theme_no || 1);

  const html = `
<div class="portfolio-container">
  <!-- Top Section: Theme, Title, Meta and Team Members -->
  <header class="portfolio-hero-banner">
    <div>
      <span class="portfolio-theme-pill">Theme: ${esc(themeName)}</span>
      <h1 class="portfolio-hero-title">${esc(title)}</h1>
      <div class="portfolio-hero-meta">
        <span>Team: <strong>Team ${esc(t.id)}</strong></span>
        <span>Faculty Mentor: <strong>${esc(guide)}</strong></span>
        <span>Academic Year: <strong>2026–27</strong></span>
      </div>
    </div>

    <!-- Team Members Details (Name, Role, USN only) -->
    <div class="portfolio-members-grid">
      ${(staticTeam?.members||t.members||[]).map((m,i)=>`
        <article class="portfolio-member-card" style="padding:14px 16px;">
          <div style="display:flex;align-items:center;gap:12px">
            <div>
              <strong style="display:block;font-size:14px;color:var(--ink);line-height:1.25">${esc(m.name)}</strong>
              <div style="margin-top:4px">
                <span style="font-size:12.5px;color:var(--muted)"><b>USN:</b> ${esc(m.usn)}</span>
              </div>
            </div>
          </div>
        </article>
      `).join('')}
    </div>
  </header>

  <!-- 2-Column Layout: Main Content + Sticky Right Navigator -->
  <div class="portfolio-layout">
    <main class="portfolio-content">

      <!-- Stage Switcher Tabs -->
      <div class="portfolio-stage-tabs" id="portfolio-stage-tabs">
        <button type="button" class="portfolio-stage-tab ${(window.activePortfolioStage||'0')==='0'?'active':''}" data-tab="0" data-target="stage-0" onclick="switchPortfolioStage('0',true)">
          Stage 0 – Problem Definition and Scope
        </button>
        <button type="button" class="portfolio-stage-tab ${window.activePortfolioStage==='1'?'active':''}" data-tab="1" data-target="stage-1" onclick="switchPortfolioStage('1',true)">
          Stage 1 - Requirement Analysis
        </button>
        <button type="button" class="portfolio-stage-tab ${window.activePortfolioStage==='system-design'?'active':''}" data-tab="system-design" data-target="sec-system-design" onclick="switchPortfolioStage('system-design',true)">
          Stage 2 - System Design
        </button>
        <button type="button" class="portfolio-stage-tab ${window.activePortfolioStage==='2'?'active':''}" data-tab="2" data-target="stage-2" onclick="switchPortfolioStage('2',true)">
          Stage 3 - Implementation and Integration
        </button>
        <button type="button" class="portfolio-stage-tab ${window.activePortfolioStage==='3'?'active':''}" data-tab="3" data-target="stage-3" onclick="switchPortfolioStage('3',true)">
          Stage 4 - Testing and Validations
        </button>
      </div>

      <!-- STAGE 0: Problem Statement and Need Identification -->
      <section class="portfolio-section" id="stage-0">
        

        <article class="portfolio-subblock" id="sec-problem">
          <h3>1. Problem Statement</h3>
          ${hasData && st0.problem ? `<p class="portfolio-prose" style="white-space:pre-line">${esc((st0.problem || '').trim())}</p>` : ''}
        </article>

        <article class="portfolio-subblock" id="sec-objectives">
          <h3>2. Project Objectives</h3>
          ${hasData && st0.objectives ? `
            <div class="portfolio-prose">
              <ul style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:8px">
                ${(Array.isArray(st0.objectives) ? st0.objectives : (st0.objectives ? [st0.objectives] : [])).map(o=>`<li>${esc(o)}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </article>

        <article class="portfolio-subblock" id="sec-courses">
          <h3>3. Foundation Course Integration</h3>
          <div class="tablewrap">
            <table class="test-suite-table" id="table-courses">
              <thead>
                <tr>
                  <th style="width:75px">Sl. Number</th>
                  <th style="width:230px">Foundation Course</th>
                  <th>Concepts Used</th>
                  <th style="width:110px">Role</th>
                </tr>
              </thead>
              <tbody>
                ${((hasData && st0.coursesTable) || []).map(c=>`
                  <tr>
                    <td style="font-weight:700;color:var(--muted)">${esc(c.sl)}</td>
                    <td style="font-weight:600;color:var(--ink)">${esc(c.course)}</td>
                    <td style="color:#000000;font-size:12px">${esc(c.concepts)}</td>
                    <td><span class="course-role-text">${esc(c.role)}</span></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </article>

        <article class="portfolio-subblock" id="sec-workflow-concept">
          <h3>4. Conceptual Workflow</h3>
          ${hasData && st0.conceptualFlowImage ? `
            <div class="portfolio-diagram-card" id="portfolio-diagram-asis" style="margin-bottom:18px; text-align:center; background:var(--surface); border:1px solid var(--line); border-radius:12px; padding:16px 20px; box-shadow:var(--shadow-xs);">
              <img src="${esc(st0.conceptualFlowImage)}" alt="${esc(st0.conceptualFlowCaption || ('Conceptual Flow - ' + title))}" style="max-width:100%; height:auto; border-radius:8px; display:block; margin:0 auto; max-height:420px; object-fit:contain;" />
              ${st0.conceptualFlowCaption ? `<p style="margin:10px 0 0;font-size:12px;font-weight:600;color:var(--muted)">${esc(st0.conceptualFlowCaption)}</p>` : ''}
            </div>
          ` : ''}

          ${hasData && st0.enginesTable && st0.enginesTable.length ? `
          <div class="tablewrap">
            <table class="test-suite-table" id="table-engines">
              <thead>
                <tr>
                  <th style="min-width:380px;width:40%">Engine</th>
                  <th style="width:60%">Conceptual responsibility</th>
                </tr>
              </thead>
              <tbody>
                ${(st0.enginesTable || []).map(e=>`
                  <tr id="portfolio-engine-${esc(e.id||'')}">
                    <td style="font-weight:700;color:var(--ink)"><div style="display:flex;align-items:center;gap:10px;white-space:nowrap"><span class="req-tag engine-outline-id" style="flex-shrink:0;margin:0">${esc(e.id||'')}</span><span style="color:#000000;font-weight:700">${esc(e.name||e.engine)}</span></div></td>
                    <td style="color:#000000;font-size:12px">${esc(e.desc)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          ` : ''}
        </article>

        <article class="portfolio-subblock" id="sec-scope">
          <h3>5. Project Scope</h3>
          <div style="display:flex;flex-direction:column;gap:18px">
            <div id="sec-scope-in" class="tablewrap" style="scroll-margin-top:100px">
              <table class="test-suite-table" id="table-scope">
                <thead>
                  <tr>
                    <th style="width:40px">#</th>
                    <th>In Scope</th>
                  </tr>
                </thead>
                <tbody>
                  ${((hasData && st0.scopeInTable) || []).map(s=>`
                    <tr>
                      <td style="font-weight:700;color:var(--brand)">${esc(s.num)}</td>
                      <td style="color:#000000;font-size:12px">${esc(s.item)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
            <div id="sec-scope-out" class="tablewrap" style="scroll-margin-top:100px">
              <table class="test-suite-table">
                <thead>
                  <tr>
                    <th style="width:40px">#</th>
                    <th>Out-of-Scope</th>
                    <th>Reason</th>
                  </tr>
                </thead>
                <tbody>
                  ${((hasData && st0.scopeOutTable) || []).map(s=>`
                    <tr>
                      <td style="font-weight:700;color:var(--muted)">${esc(s.num)}</td>
                      <td style="color:#000000;font-size:12px">${esc(s.item)}</td>
                      <td style="color:#000000;font-size:11.5px">${esc(s.reason)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </article>

        <article class="portfolio-subblock" id="sec-feasibility">
          <h3>6. Feasibility &amp; Constraints</h3>
          <div class="tablewrap">
            <table class="test-suite-table" id="table-feasibility">
              <thead>
                <tr>
                  <th style="width:200px">Aspect</th>
                  <th>Assessment</th>
                </tr>
              </thead>
              <tbody>
                ${((hasData && st0.feasibilityTable) || []).map(f=>`
                  <tr>
                    <td style="font-weight:600;color:var(--ink)">${esc(f.aspect)}</td>
                    <td style="color:#000000;font-size:12px">${esc(f.assessment)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </article>
      </section>

      <!-- STAGE 1: Requirement Analysis -->
      <section class="portfolio-section" id="stage-1">
        

        <article class="portfolio-subblock" id="sec-fr">
          <h3>1. Functional Requirements</h3>
          <div class="tablewrap">
            <table class="test-suite-table fr-table" id="table-fr">
              <thead>
                <tr>
                  <th style="width:76px;text-align:center">FR ID</th>
                  <th style="width:52%">Description</th>
                  <th style="width:105px;text-align:center">Priority</th>
                  <th style="width:38%">Source Need (from S0)</th>
                </tr>
              </thead>
              <tbody>
                ${((hasData && st1.frTable) || []).map(fr=>`
                  <tr id="portfolio-fr-${esc(fr.id)}">
                    <td style="text-align:center"><span class="req-tag">${esc(fr.id)}</span></td>
                    <td class="fr-desc" style="font-size:12.5px;color:var(--ink);line-height:1.5">${esc(fr.desc)}</td>
                    <td style="text-align:center"><span class="requirement-meta-text">${esc(fr.priority||'Mandatory')}</span></td>
                    <td class="fr-source" style="font-size:12px;color:var(--muted);line-height:1.45">${esc(fr.sourceNeed||'')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </article>

        <article class="portfolio-subblock" id="sec-nfr">
          <h3>2. Non - Functional Requirements</h3>
          <div class="tablewrap">
            <table class="test-suite-table nfr-table" id="table-nfr">
              <thead>
                <tr>
                  <th style="width:80px;text-align:center">NFR ID</th>
                  <th style="width:45%">Description</th>
                  <th style="width:155px">Category</th>
                  <th style="width:42%">Measurable Target</th>
                </tr>
              </thead>
              <tbody>
                ${((hasData && st1.nfrTable) || []).map(nfr=>`
                  <tr id="portfolio-nfr-${esc(nfr.id)}">
                    <td style="text-align:center"><span class="req-tag">${esc(nfr.id)}</span></td>
                    <td class="nfr-desc" style="font-size:12.5px;color:var(--ink);line-height:1.5">${esc(nfr.desc)}</td>
                    <td><span class="requirement-meta-text">${esc(nfr.cat||nfr.category||'')}</span></td>
                    <td class="nfr-target" style="font-size:12px;color:var(--brand);font-weight:600;line-height:1.45">${esc(nfr.target||'')}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </article>

        <article class="portfolio-subblock" id="sec-usecase">
          <h3>3. Use Cases</h3>
          <div class="tablewrap" style="margin-bottom:14px">
            <table class="test-suite-table">
              <thead>
                <tr>
                  <th style="width:50px">ID</th>
                  <th style="width:110px">Actor</th>
                  <th style="width:220px">Description / User Story</th>
                  <th>Main Flow</th>
                  <th>Exception Flow</th>
                </tr>
              </thead>
              <tbody>
                ${((hasData && st1.userStoryTable) || []).map(u=>`
                  <tr>
                    <td><span class="req-tag">${esc(u.id)}</span></td>
                    <td><span class="tag gray" style="font-size:10.5px">${esc(u.actor)}</span></td>
                    <td style="font-weight:600;font-size:12px;color:var(--ink)">${esc(u.desc)}</td>
                    <td style="font-size:11.5px;color:#000000">${esc(u.mainFlow)}</td>
                    <td style="font-size:11.5px;color:var(--amber,#b45309)">${esc(u.exceptionFlow)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          ${hasData && st1.useCaseImage ? `
          <div class="diagram-frame" id="portfolio-diagram-usecase" style="margin-top:14px;background:#ffffff;border:1px solid var(--line);border-radius:12px;padding:16px;text-align:center">
            <img src="${esc(st1.useCaseImage)}" alt="${esc(st1.useCaseCaption || 'Fig : Use case diagram')}" style="max-width:100%;height:auto;border-radius:8px;display:block;margin:0 auto;box-shadow:0 2px 10px rgba(0,0,0,0.06);cursor:zoom-in" onclick="window.open(this.src,'_blank')">
            <p class="diagram-caption" style="margin-top:10px;font-size:12.5px;font-weight:700;color:#000000">${esc(st1.useCaseCaption || 'Fig : Use case diagram')}</p>
          </div>
          ` : ''}
        </article>

        <article class="portfolio-subblock" id="sec-acceptance">
          <h3>4. Acceptance Criteria</h3>
          <div class="tablewrap">
            <table class="test-suite-table" id="table-testsuite">
              <thead>
                <tr>
                  <th style="width:110px">Requirement ID</th>
                  <th>Acceptance Criteria</th>
                  <th style="width:240px">Test / Verification Method</th>
                </tr>
              </thead>
              <tbody>
                ${((hasData && st1.acceptanceTable) || []).map(tc=>`
                  <tr>
                    <td><span class="req-tag">${esc(tc.req)}</span></td>
                    <td style="font-size:12.5px;color:var(--ink);line-height:1.5">${esc(tc.criteria)}</td>
                    <td style="font-size:12px;color:#000000">${esc(tc.method)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </article>
      </section>

      <!-- System Design -->
      <section class="portfolio-section" id="sec-system-design">
        <div class="portfolio-section-title">
          <h2>Stage 2 - System Design</h2>
        </div>

        ${hasData && sys && sys.architecturePoints && sys.architecturePoints.length ? `
        <article class="portfolio-subblock" id="sec-arch">
          <h3>1. Architecture</h3>
          <div class="portfolio-prose" style="display:flex;flex-direction:column;gap:6px">
            ${(sys.architecturePoints || []).map(pt=>`<p style="margin:0;line-height:1.6">${esc(pt)}</p>`).join('')}
          </div>
          <div class="diagram-frame" style="margin-top:14px;background:#ffffff;border:1px solid var(--line);border-radius:12px;padding:16px;text-align:center">
            <img src="${sys.architectureImage || 'assets/team03_architecture_doc.png'}" alt="Fig 1. Architecture Diagram" style="max-width:100%;height:auto;border-radius:8px;display:block;margin:0 auto;box-shadow:0 2px 10px rgba(0,0,0,0.06);cursor:zoom-in" onclick="window.open(this.src,'_blank')">
            <p class="diagram-caption" style="margin-top:10px;font-size:12.5px;font-weight:700;color:#000000">Fig 1. Architecture Diagram</p>
          </div>
        </article>

        <article class="portfolio-subblock" id="sec-data-design">
          <h3>2. Data Design</h3>
          <div class="portfolio-prose" style="display:flex;flex-direction:column;gap:6px">
            ${(sys.dataDesignPoints || []).map(pt=>`<p style="margin:0;line-height:1.6">${esc(pt)}</p>`).join('')}
          </div>
          <div class="diagram-frame" style="margin-top:14px;background:#ffffff;border:1px solid var(--line);border-radius:12px;padding:16px;text-align:center">
            <img src="${sys.dataDesignImage || 'assets/team03_datadesign_doc.jpeg'}" alt="Fig 2. Data Design" style="max-width:100%;height:auto;border-radius:8px;display:block;margin:0 auto;box-shadow:0 2px 10px rgba(0,0,0,0.06);cursor:zoom-in" onclick="window.open(this.src,'_blank')">
            <p class="diagram-caption" style="margin-top:10px;font-size:12.5px;font-weight:700;color:#000000">Fig 2. Data Design</p>
          </div>
        </article>

        <article class="portfolio-subblock" id="sec-algo-design">
          <h3>3. Algorithm Design</h3>
          <div class="portfolio-prose" style="display:flex;flex-direction:column;gap:6px">
            ${(sys.algorithmDesignPoints || []).map(pt=>`<p style="margin:0;line-height:1.6">${esc(pt)}</p>`).join('')}
          </div>
          <div class="diagram-frame" style="margin-top:14px;background:#ffffff;border:1px solid var(--line);border-radius:12px;padding:16px;text-align:center">
            <img src="${sys.algorithmDesignImage || 'assets/team03_algorithmdesign_new.jpeg'}" alt="Fig 3. Algorithm Design" style="max-width:100%;height:auto;border-radius:8px;display:block;margin:0 auto;box-shadow:0 2px 10px rgba(0,0,0,0.06);cursor:zoom-in" onclick="window.open(this.src,'_blank')">
            <p class="diagram-caption" style="margin-top:10px;font-size:12.5px;font-weight:700;color:#000000">Fig 3. Algorithm Design</p>
          </div>
        </article>

        <article class="portfolio-subblock" id="sec-security-design">
          <h3>4. Security Design</h3>
        </article>
        ` : `
        <div class="empty-stage-notice" style="padding: 28px; text-align: center; color: var(--muted); background: var(--surface); border: 1.5px dashed var(--line); border-radius: 12px; margin-top: 14px;">
          <p style="font-size: 15px; font-weight: 600; margin: 0; color: var(--muted);">Content will be updated soon.</p>
        </div>
        `}
      </section>

      <!-- Implementation and Integration -->
      <section class="portfolio-section" id="stage-2">
        <div class="portfolio-section-title">
          <h2>Stage 3 - Implementation and Integration</h2>
        </div>
        <div class="empty-stage-notice" style="padding: 28px; text-align: center; color: var(--muted); background: var(--surface); border: 1.5px dashed var(--line); border-radius: 12px; margin-top: 14px;">
          <p style="font-size: 15px; font-weight: 600; margin: 0; color: var(--muted);">Content will be updated soon.</p>
        </div>
      </section>

      <!-- Testing and Validations -->
      <section class="portfolio-section" id="stage-3">
        <div class="portfolio-section-title">
          <h2>Stage 4 - Testing and Validations</h2>
        </div>
        <div class="empty-stage-notice" style="padding: 28px; text-align: center; color: var(--muted); background: var(--surface); border: 1.5px dashed var(--line); border-radius: 12px; margin-top: 14px;">
          <p style="font-size: 15px; font-weight: 600; margin: 0; color: var(--muted);">Content will be updated soon.</p>
        </div>
      </section>
    </main>
  </div>
</div>
`;
  setTimeout(() => {
    if (typeof mountPortfolioChat === 'function') {
      mountPortfolioChat(t.id);
    }
  }, 60);
  return html;
};

function openTeamPortfolio(id){
  const next = state.teams.find(t => t.id === id);
  window.lastViewedTheme = (selectedTheme !== null && selectedTheme !== undefined) ? selectedTheme : (next?.theme_no || 1);
  activePortfolioStage = '0';
  window.activePortfolioStage = '0';
  switchTeam(id);
  go('Team Portfolio');
  window.scrollTo(0, 0);
}

function backToThemeProjects(themeNum){
  const t = activeTeam() || state.teams[0];
  const target = (themeNum !== undefined && themeNum !== null)
    ? themeNum
    : ((window.lastViewedTheme !== undefined && window.lastViewedTheme !== null) ? window.lastViewedTheme : (t?.theme_no || 1));
  selectedTheme = target;
  window.lastViewedTheme = target;
  page = 'Department';
  render();
  window.scrollTo(0, 0);
}
window.backToThemeProjects = backToThemeProjects;


let selectedTheme = null;

const THEME_INFO = {
  1: { name: 'Data Storage and Retrieval Systems', count: 4, desc: 'Specialized systems for indexing, caching, storage engines, and persistent query retrieval.' },
  2: { name: 'Data Processing and Analytics Systems', count: 4, desc: 'Real-time telemetry, log processing, data profiling, streaming, and metric transformation pipelines.' },
  3: { name: 'System Software and Development Tools', count: 5, desc: 'System utilities, runtime profilers, execution monitors, memory diagnostic tools, and compiler tooling.' },
  4: { name: 'Networked Systems and Tools', count: 6, desc: 'Network topologies, protocol routers, distributed coordination, remote procedure utilities, and communication.' },
  5: { name: 'Algorithmic and Optimization Systems', count: 4, desc: 'Constraint satisfaction engines, resource allocation algorithms, routing heuristics, and combinatorial solvers.' },
  6: { name: 'Concurrent and Transactional Systems', count: 10, desc: 'Transaction atomicity, concurrent lock managers, mutual exclusion models, distributed ledgers, and consensus.' }
};

function getThemeTabTitle(tab){
  if(tab === 'all') return 'All Themes · Complete CSE(AI) Project Directory (33 Projects)';
  const info = THEME_INFO[tab];
  return info ? `Theme ${tab}: ${info.name}` : `Theme ${tab}`;
}

function getThemeTabCount(tab){
  if(!state.teams) return 0;
  if(tab === 'all') return state.teams.length;
  return state.teams.filter(t => t.theme_no === Number(tab) || (t.topic||'').startsWith(`Theme ${tab}:`)).length;
}

function openThemePage(themeNo){
  selectedTheme = themeNo;
  render();
  window.scrollTo(0, 0);
}

function backToThemes(){
  selectedTheme = null;
  render();
  window.scrollTo(0, 0);
}

function formatTeamMembers(members){
  if(!members || !members.length) return '';
  const names = members.map(m => m.name || m);
  const rows = [];
  for(let i = 0; i < names.length; i += 2){
    rows.push(names.slice(i, i + 2).join(', '));
  }
  return `<div style="font-size:13px; color:#000000; line-height:1.55">
    ${rows.map(r => `<div>${esc(r)}</div>`).join('')}
  </div>`;
}

function getThemePriority(team, themeNo){
  const id = team.id || '';
  const title = (team.title || '').toLowerCase();
  const th = Number(themeNo);
  
  if (th === 2) {
    if (id === 'A-08' || id === '08' || title.includes('profiling') || title.includes('data quality')) return 1;
    if (id === 'B-10' || id === '10' || title.includes('log processing') || (title.includes('log') && title.includes('analytics engine'))) return 2;
  } else if (th === 3) {
    if (id === 'B-01' || title.includes('incremental build') || (title.includes('incremental') && title.includes('dependency resolution'))) return 1;
    if (id === 'A-14' || id === '14' || title.includes('mini kernel') || title.includes('mini -kernel')) return 2;
    if (id === 'B-07' || id === '07' || title.includes('java compiler')) return 3;
  } else if (th === 4) {
    if (id === 'B-13' || id === '13' || title.includes('resilient multi-peer') || title.includes('peer file distribution')) return 1;
    if (id === 'A-07' || id === 'a07' || (title.includes('network traffic') && title.includes('protocol analysis'))) return 2;
    if (id === 'B-12' || id === '12' || title.includes('http proxy')) return 3;
  }
  return 999;
}

function hodProjectRowsForTheme(tab){
  let list = state.teams || [];
  if(tab !== 'all'){
    list = list.filter(t => t.theme_no === Number(tab) || (t.topic||'').startsWith(`Theme ${tab}:`));
  }
  const thNum = Number(tab);
  list = list.slice().sort((a,b) => {
    const pA = getThemePriority(a, thNum || a.theme_no);
    const pB = getThemePriority(b, thNum || b.theme_no);
    if(pA !== pB) return pA - pB;
    return (a.excel_order || 0) - (b.excel_order || 0);
  });

  if(!list.length){
    return '<tr><td colspan="4" style="text-align:center;padding:24px;color:#000000;font-size:13.5px">No projects found in this theme.</td></tr>';
  }

  return list.map(t=>`
    <tr>
      <td style="padding: 12px 16px;">
        <strong style="color:#000000;font-size:14px;display:block;line-height:1.35">${esc(t.title)}</strong>
      </td>
      <td style="padding: 12px 16px;">
        <strong style="font-size:13.5px;color:#000000;display:block">${esc(t.faculty)}</strong>
      </td>
      <td style="padding: 12px 16px;">
        ${formatTeamMembers(t.members)}
      </td>
      <td style="text-align:center; padding: 12px 16px;">
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
  const all = state.teams || [];
  const facultyList = facultyNames();

  if(selectedTheme !== null){
    const themeNo = selectedTheme;
    const isAll = themeNo === 'all';
    const info = THEME_INFO[themeNo] || {};
    const title = isAll ? 'All Themes : Complete CSE(AI) Project Directory' : `Theme ${themeNo} : ${info.name || ''}`;
    const count = getThemeTabCount(themeNo);

    return `
      <div style="margin-bottom: 14px;">
        <button class="btn secondary" style="padding:7px 15px; font-size:13px; font-weight:700; display:inline-flex; align-items:center; gap:6px; margin-bottom:12px; cursor:pointer" onclick="backToThemes()">
          ← Back to Themes
        </button>

        <div style="background:var(--surface); border:1px solid var(--line); border-radius:12px; padding: 18px 22px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; box-shadow:var(--shadow-xs)">
          <div>
            <h1 style="font-size:20px; font-weight:800; color:#000000; margin:0">
              ${esc(title)}
            </h1>
          </div>
          <span class="tag" style="background:var(--surface); color:#000000; border:1px solid var(--line); font-weight:700; font-size:13px; padding:5px 14px; border-radius:8px">
            ${count} Projects
          </span>
        </div>
      </div>

      <section class="card" style="padding: 12px 18px; margin-bottom: 8px; border-radius: 12px;">
        <div class="tablewrap" style="max-height: calc(100vh - 220px); overflow-y: auto;">
          <table class="roster compact-roster" id="hod-projects-table" style="width:100%">
            <thead style="position: sticky; top: 0; z-index: 10; background:var(--surface)">
              <tr>
                <th style="padding: 12px 16px; font-size: 13px; color:#000000; text-align:left">Project Title</th>
                <th style="width:220px; padding: 12px 16px; font-size: 13px; color:#000000; text-align:left">Faculty Mentor</th>
                <th style="width:300px; padding: 12px 16px; font-size: 13px; color:#000000; text-align:left">Team Members</th>
                <th style="width:160px; text-align:center; padding: 12px 16px; font-size: 13px; color:#000000">Project Portfolio</th>
              </tr>
            </thead>
            <tbody id="hod-project-rows">
              ${hodProjectRowsForTheme(themeNo)}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  return `
    <div class="heading faculty-dashboard-heading" style="margin-bottom: 12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
      <div>
        <h1 style="font-size:22px; font-weight:800; color:#000000; margin:0; line-height:1.2">
          Mini-Project Dashboard
        </h1>
        <p class="faculty-dashboard-lead">Dr. Narayan D.G. &middot; Head of Department</p>
      </div>
      
    </div>

    <div class="stat-cards-grid" style="display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin:6px 0 16px;">
      ${[['Themes',6],['Faculty Mentors',16],['Teams',all.length]].map(([label,count])=>`
        <div style="background:var(--surface); border:1px solid var(--line); border-radius:12px; padding:16px 22px; display:flex; align-items:center; gap:16px; box-shadow:var(--shadow-xs);">
          <div class="projector-stat-label" style="font-weight:700; line-height:1.25">${label} -</div>
          <div class="projector-stat-number" style="font-weight:800; color:var(--brand); line-height:1">${count}</div>
        </div>
      `).join('')}
    </div>

    <section class="card" style="padding: 20px 22px; margin-bottom: 8px; border-radius: 12px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px;">
        <h2 style="font-size:17px; font-weight:800; color:#000000; margin:0">
          Project Themes
        </h2>
        
      </div>

      <div class="theme-cards-grid" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 16px;">
        ${[1, 2, 3, 4, 5, 6].map(no => {
          const info = THEME_INFO[no];
          const count = getThemeTabCount(no);
          return `
            <article class="theme-card-item" onclick="openThemePage(${no})" style="cursor:pointer; background:var(--surface); border:1px solid var(--line); border-radius:12px; padding:20px; transition:all 0.2s ease; box-shadow:var(--shadow-xs); display:flex; flex-direction:column; justify-content:space-between; gap:14px;">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px">
                  <h3 style="font-size:15.5px; font-weight:800; color:#000000; margin:0; line-height:1.35">
                    Theme ${no} : ${esc(info.name)}
                  </h3>
                  <span class="tag" style="background:var(--surface); color:#000000; border:1px solid var(--line); font-weight:700; font-size:12px; padding:4px 10px; border-radius:6px; flex-shrink:0">
                    ${count} Projects
                  </span>
                </div>
              </div>
              <div style="display:flex; align-items:center; justify-content:flex-end; padding-top:10px; border-top:1px solid var(--line);">
              </div>
            </article>
          `;
        }).join('')}
      </div>
    </section>
  `;
}

function openRosterTeam(id){openTeamPortfolio(id)}
function saveTeamDetails(){if(!isAdmin())return;const topic=$('#team-topic')?.value?.trim()||activeTeam().topic;state.repo=$('#repo')?.value?.trim()||state.repo;activeTeam().topic=topic;save();toast('Project details saved.');}
function teamStatus(t){return t.id===state.activeTeamId?state:state.workspaces[t.id]||{status1:'Draft',status2:'Locked'}}
function facultyCards(){return facultyNames().map(name=>{const teams=state.teams.filter(t=>t.faculty===name);return `<div class="faculty-card">${avatar({name})}<div><h3>${esc(name)}</h3><p class="mini">Faculty guide · CSE(AI) · ${teams.length} team${teams.length===1?'':'s'}</p><p class="mini">${teams.map(t=>'Team '+esc(t.id)).join(' · ')||'No teams assigned'}</p></div></div>`}).join('')}
function allocationForm(){return `<section class="card"><h2>Team guide allocation</h2><p>Faculty Admin coordinates guide assignments under the CSE(AI) HOD.</p><label for="allocate-team">Team</label><select id="allocate-team">${state.teams.map(t=>`<option value="${esc(t.id)}">Team ${esc(t.id)} · ${esc(t.title)}</option>`).join('')}</select><label for="allocate-guide">Faculty guide</label><select id="allocate-guide">${facultyNames().map(n=>`<option>${esc(n)}</option>`).join('')}</select><button class="btn" style="margin-top:16px" onclick="allocateGuide()">Save allocation</button></section>`}
function facultyAdminPanel(){return heading('Coordinate faculty. Support every team.','CSE(AI) Faculty Admin · under '+esc(state.department.hod))+`<div class="grid"><div>${allocationForm()}<section class="card"><h2>Faculty directory</h2>${facultyCards()}</section></div><section class="card"><h2>Department ownership</h2><p><strong>Department:</strong> CSE(AI)</p><p><strong>HOD:</strong> ${esc(state.department.hod)}</p><p><strong>Faculty Admin:</strong> ${esc(state.department.facultyAdmin)}</p><div class="notice">Faculty Admin manages guide allocations. The assigned Faculty guide reviews and approves submissions. Admin imports the complete Excel roster.</div><button class="btn secondary" onclick="go('Department')">View all CSE(AI) teams →</button></section></div>`}
function allocateGuide(){if(!['Admin','Faculty Admin'].includes(state.role))return;const t=state.teams.find(t=>t.id===$('#allocate-team').value),name=$('#allocate-guide').value;if(!t||!facultyNames().includes(name))return;save();t.faculty=name;if(t.id===state.activeTeamId)state.guide=name;if(state.workspaces[t.id])state.workspaces[t.id].guide=name;save();render();toast('CSE(AI) guide allocation saved.')}
let importPreview=null;
function adminPanel(){return heading('CSE(AI) · Administration','Import the department roster, assign guides and manage department ownership.',`<span class="tag">ADMIN PANEL</span>`)+`<div class="grid"><div><section class="card"><h2>Import complete Excel roster</h2><p>One row per team, with four member names and USNs, faculty, topic and project title.</p><div class="actions"><a class="btn secondary" href="CS-AI-Roster-Template.xlsx" download>↓ Excel template with dummy teams</a><button class="btn secondary" onclick="exportRoster()">Export current roster (CSV)</button></div><label for="roster-file">Excel / CSV file</label><input id="roster-file" type="file" accept=".xlsx,.xls,.csv"><p class="mini">Files stay in this browser. Up to 10 MB and 2,000 team rows. Macros and formulas are never executed.</p><button class="btn" onclick="readRosterFile()">Read & validate file →</button><div id="import-result" role="status">${importPreview?previewHTML():''}</div><details style="margin-top:18px"><summary>Required columns and import rules</summary><p class="mini">Team ID, Faculty Name, Topic, Project Title, Member 1 Name, Member 1 USN … Member 4 Name, Member 4 USN. Member 1 is Team Lead. Department, HOD and Faculty Admin are optional columns; blank values use the current CSE(AI) settings. Non-CS-AI departments are rejected. Only sheets with recognized team columns are read. Existing Team IDs are updated; new IDs are added. Other teams and their saved work are preserved.</p></details></section>${allocationForm()}</div><div><section class="card"><h2>One department. One HOD.</h2><label for="department-name">Department</label><input id="department-name" value="CSE(AI)" disabled><label for="hod-name">CSE(AI) HOD name</label><input id="hod-name" value="${esc(state.department.hod)}"><label for="faculty-admin-name">Faculty Admin name</label><input id="faculty-admin-name" value="${esc(state.department.facultyAdmin)}"><button class="btn secondary" style="margin-top:16px" onclick="saveDepartmentOwner()">Save department ownership</button><p class="mini">HOD and Faculty Admin names are placeholders until you enter the real names or import them.</p></section><section class="card"><h2>Faculty directory</h2>${facultyCards()}</section><section class="card"><h2>Department records</h2><p>${state.teams.length} teams · ${state.teams.length*4} students · CSE(AI)</p><button class="btn secondary" onclick="go('Department')">Open complete roster →</button></section></div></div>`}
function saveDepartmentOwner(){if(state.role!=='Admin')return;const hod=$('#hod-name').value.trim(),facultyAdmin=$('#faculty-admin-name').value.trim();if(!hod||!facultyAdmin)return toast('Enter both the HOD and Faculty Admin names.');state.department={name:'CSE(AI)',hod,facultyAdmin};state.teams.forEach(t=>{t.hod=hod;t.facultyAdmin=facultyAdmin});save();render();toast('All CSE(AI) teams now report to the saved department owners.')}
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
 for(let i=head+1;i<rows.length;i++){const row=rows[i];if(!row.some(v=>String(v).trim()))continue;const obj={};keys.forEach((key,j)=>{if(key)obj[key]=String(row[j]??'').trim()});if(!Object.values(obj).some(v=>v.trim()))continue;const at=`${name}, row ${i+1}`;if(needed.some(k=>!obj[k])){errors.push(`${at}: complete all four names/USNs, team ID, faculty, topic and title.`);continue}if(obj.department&&!isCSAI(obj.department)){errors.push(`${at}: department must be CS (AI).`);continue}let id=obj.id.replace(/^team[\s-]*/i,'').trim();if(/^\d+$/.test(id))id=String(Number(id)).padStart(2,'0');if(!/^[A-Za-z0-9_-]{1,30}$/.test(id)){errors.push(`${at}: Team ID must contain only letters, digits, hyphens or underscores (max 30).`);continue}const team={id,department:'CS (AI)',hod:obj.hod||state.department.hod,facultyAdmin:obj.facultyAdmin||state.department.facultyAdmin,faculty:obj.faculty,topic:obj.topic,title:obj.title,members:Array.from({length:4},(_,j)=>({name:obj['member'+(j+1)+'name'],usn:obj['member'+(j+1)+'usn'].toUpperCase()})),sample:false,source:at};if(Object.values(obj).some(v=>v.length>3000)){errors.push(`${at}: one or more fields exceed 3,000 characters.`);continue}team.sample=team.members.every(m=>m.usn.startsWith('DEMO-'));teams.push(team)}
 }
 if(!found)errors.push('No team sheet found. Use the downloadable template with Team ID and Project Title headers.');if(teams.length>2000)errors.push('Maximum 2,000 teams per import.');
 const ids=new Set();teams.forEach(t=>{const key=t.id.toLowerCase();if(ids.has(key))errors.push(`${t.source}: duplicate Team ID ${t.id}.`);ids.add(key)});
 const incomingIds=new Set(teams.map(t=>t.id.toLowerCase())),merged=[...state.teams.filter(t=>!incomingIds.has(t.id.toLowerCase())),...teams],usns=new Map();merged.forEach(t=>t.members.forEach(m=>{const key=m.usn.toUpperCase();if(usns.has(key))errors.push(`Duplicate USN ${m.usn}: teams ${usns.get(key)} and ${t.id}.`);else usns.set(key,t.id)}));
 const hods=[...new Set(teams.map(t=>t.hod))],admins=[...new Set(teams.map(t=>t.facultyAdmin))];if(hods.length>1)errors.push('All rows must have the same CS (AI) HOD.');if(admins.length>1)errors.push('All rows must have the same CS (AI) Faculty Admin.');
 if(!teams.length&&!errors.length)errors.push('No populated team records found.');return {teams,errors,skipped,hod:hods[0],facultyAdmin:admins[0]};
}
async function readRosterFile(){if(state.role!=='Admin')return;const file=$('#roster-file').files[0];if(!file)return toast('Choose an Excel or CSV file first.');if(!/\.(xlsx|xls|csv)$/i.test(file.name)||file.size>10*1024*1024)return toast('Choose .xlsx, .xls or .csv under 10 MB.');try{if(typeof XLSX==='undefined')throw Error('Excel library unavailable. Reload the page.');const wb=XLSX.read(await file.arrayBuffer(),{type:'array',cellFormula:false,cellHTML:false,cellStyles:false,bookVBA:false});importPreview=parseRoster(wb);importPreview.filename=file.name;$('#import-result').innerHTML=previewHTML()}catch(e){importPreview=null;$('#import-result').textContent='Could not read this file: '+e.message}}
function previewHTML(){if(!importPreview)return '';const p=importPreview;return `<div class="notice" style="margin-top:18px"><strong>${esc(p.filename||'Workbook')} · ${p.teams.length} team rows · ${p.errors.length} validation errors</strong><p class="mini">${p.skipped.length?'Skipped sheets without team headers: '+esc(p.skipped.join(', ')):''}</p>${p.errors.length?`<ul>${p.errors.slice(0,30).map(e=>`<li>${esc(e)}</li>`).join('')}</ul>${p.errors.length>30?'<p>Only the first 30 errors are shown.</p>':''}<p>No changes saved. Correct the file and read it again.</p>`:`<p>Ready to add ${p.teams.filter(t=>!state.teams.some(x=>x.id.toLowerCase()===t.id.toLowerCase())).length} teams and update ${p.teams.filter(t=>state.teams.some(x=>x.id.toLowerCase()===t.id.toLowerCase())).length} existing teams. Department: CSE(AI) · HOD: ${esc(p.hod)} · Faculty Admin: ${esc(p.facultyAdmin)}</p><div class="tablewrap"><table><thead><tr><th>Team</th><th>Faculty</th><th>Project title / Topic</th><th>Four members / USN</th></tr></thead><tbody>${p.teams.slice(0,10).map(t=>`<tr><td>${esc(t.id)}</td><td>${esc(t.faculty)}</td><td>${esc(t.title)}<p class="mini">${esc(t.topic)}</p></td><td>${t.members.map(m=>esc(m.name)+' · '+esc(m.usn)).join('<br>')}</td></tr>`).join('')}</tbody></table></div>${p.teams.length>10?'<p>Preview shows the first 10 teams; all validated records will import.</p>':''}<button class="btn" onclick="commitRosterImport()">Import ${p.teams.length} validated teams</button>`}</div>`}
function commitRosterImport(){if(state.role!=='Admin'||!importPreview||importPreview.errors.length)return;syncTeam();const backup=clone(state);try{const p=importPreview;state.department={name:'CSE(AI)',hod:p.hod,facultyAdmin:p.facultyAdmin};p.teams.forEach(incoming=>{const old=state.teams.find(t=>t.id.toLowerCase()===incoming.id.toLowerCase()),t=clone(incoming);delete t.source;if(old){t.id=old.id;const w=state.workspaces[old.id];if(w){w.members=t.members.map((m,i)=>({...w.members[i],...m}));w.guide=t.faculty;w.forms[1].title=t.title}Object.assign(old,t)}else{state.teams.push(t);state.workspaces[t.id]=newTeamWorkspace(t)}});state.teams.forEach(t=>{t.hod=p.hod;t.facultyAdmin=p.facultyAdmin});const active=state.teams.find(t=>t.id===state.activeTeamId),w=state.workspaces[active.id];workspaceKeys.forEach(k=>delete state[k]);Object.assign(state,clone(w));state.guide=active.faculty;state.members=state.members.map((m,i)=>({...m,...active.members[i]}));state.forms[1].title=active.title;if(!save()){state=backup;return}const count=p.teams.length;importPreview=null;render();toast(`Imported ${count} teams. CSE(AI) roster saved in this browser.`)}catch(e){state=backup;toast('Import was not saved: '+e.message)}}
function rosterMatrix(){const h=['Department','HOD','Faculty Admin','Team ID','Faculty Name','Topic','Project Title',...Array.from({length:4},(_,i)=>['Member '+(i+1)+' Name','Member '+(i+1)+' USN']).flat()];return [h,...state.teams.map(t=>['CSE(AI)',state.department.hod,state.department.facultyAdmin,t.id,t.faculty,t.topic,t.title,...t.members.flatMap(m=>[m.name,m.usn])])]}
function exportRoster(){if(!['Admin','Faculty Admin'].includes(state.role))return;save();const matrix=rosterMatrix(),csv=matrix.map(r=>r.map(v=>'"'+String(v).replace(/^[=+@-]/,"'$&").replace(/"/g,'""')+'"').join(',')).join('\r\n'),url=URL.createObjectURL(new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download='CSE(AI)-Complete-Roster.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
save();render();
