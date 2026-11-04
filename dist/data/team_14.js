/**
 * Static Data File for Team A-14
 * Project: Mini-kernel with process, memory and file management
 * Source documents: mini-gate0_nov_4.docx & Review 2-Requirements Analysis_nov_4.docx
 * Faculty Mentor: Ms. Arundati Aralimatti
 */

window.STATIC_TEAMS_DATA = window.STATIC_TEAMS_DATA || {};

const team14Data = {
  "id": "A-14",
  "theme": "System Software and Development Tools",
  "title": "Mini-kernel with process, memory and file management",
  "guide": "Ms. Arundati Aralimatti",
  "academicYear": "2026–27",
  "repo": "https://github.com/topics/mini-kernel-os",
  "members": [
    {
      "name": "Pradeep",
      "usn": "01FE24BCI040",
      "role": "Team Member",
      "skills": "Kernel Architecture • Bootloader • Context Switching",
      "contribution": "Kernel initialization, CPU context switching, and x86-64 assembly boot integration.",
      "github": "https://github.com"
    },
    {
      "name": "Bhavana",
      "usn": "01FE24BCI036",
      "role": "Team Member",
      "skills": "Process Management • Round Robin Scheduling • Lifecycle States",
      "contribution": "Process control block (PCB) management, process state transitions, and CPU scheduling.",
      "github": "https://github.com"
    },
    {
      "name": "Vikitha R",
      "usn": "01FE24BCI055",
      "role": "Team Member",
      "skills": "Memory Management • Paging • Page Frame Allocator",
      "contribution": "Fixed-size page allocation, memory availability tracking, and allocator safety validation.",
      "github": "https://github.com"
    },
    {
      "name": "Zakiya",
      "usn": "01FE24BCI038",
      "role": "Team Member",
      "skills": "File Management • VFS / Inodes • Process File Descriptors",
      "contribution": "File subsystem operations, file descriptor tables, and QEMU persistent storage emulation.",
      "github": "https://github.com"
    }
  ],
  "stage0": {
    "problem": "Our project focuses on understanding how a computer can start and run its own basic operating-system kernel. A kernel is the core part of an operating system that manages access to hardware resources and provides essential services to programs. Developing even a small kernel involves several connected responsibilities, such as starting execution after boot, managing memory, handling processes, and organizing data on storage.\n\nOur proposed mini-kernel is a small x86-64 operating-system kernel developed from the ground up for learning and demonstration. It will be loaded by a bootloader and executed in an emulated computer environment during development. The project aims to implement selected kernel-level facilities and demonstrate how they work together. The work will use xv6 and other educational resources only for understanding operating-system concepts; the xv6 codebase will not be used as the project foundation.\n\nWe consider this a suitable Mini Project because it gives us an opportunity to study operating-system fundamentals through implementation rather than only theoretical discussion. A controlled scope will allow us to demonstrate the basic working of a kernel without attempting to build a complete commercial operating system.",
    "objectives": [
      "To understand the role of a kernel in an operating system and study the basic stages involved in starting kernel execution.",
      "To design and develop a small x86-64 kernel from scratch, using an existing bootloader as the initial loading mechanism.",
      "To explore and implement selected fundamental kernel responsibilities related to process, memory and file management.",
      "To demonstrate the kernel in an emulated hardware environment and observe its behaviour during execution.",
      "To apply foundational Computer Science and system-software concepts through a practical, demonstrable operating-system project."
    ],
    "coursesTable": [
      {
        "sl": "1",
        "course": "Operating System Principles",
        "concepts": "Kernel responsibilities, process management, memory management, file systems, interrupts and resource management",
        "role": "Dominant"
      },
      {
        "sl": "2",
        "course": "Computer Organization and Architecture",
        "concepts": "Processor basics, boot process, CPU operation, memory hierarchy and hardware interaction",
        "role": "Dominant"
      },
      {
        "sl": "3",
        "course": "Data Structures & Algorithms",
        "concepts": "Queues, lists, trees or other suitable structures, searching, scheduling concepts and efficient management of kernel data",
        "role": "Supporting"
      }
    ],
    "conceptualFlowImage": "assets/team14_conceptual_workflow.png",
    "conceptualFlowCaption": "Fig 1. Conceptual Workflow of Mini-kernel with process, memory and file management",
    "scopeInTable": [
      {
        "num": "1",
        "item": "Study and demonstrate the boot flow in which a bootloader loads the mini-kernel and transfers control to it."
      },
      {
        "num": "2",
        "item": "Develop a small kernel that can initialize and execute in a controlled emulated environment."
      },
      {
        "num": "3",
        "item": "Explore and implement basic process-management concepts, within the limits of the project scope."
      },
      {
        "num": "4",
        "item": "Explore and implement basic memory-management and file-management facilities, including a demonstration of persistent data using an emulated storage image if feasible."
      }
    ],
    "scopeOutTable": [
      {
        "num": "1",
        "item": "A complete general-purpose operating system with full POSIX or Linux compatibility",
        "reason": "This would require a much larger development effort and is beyond the time and credit limits of the Mini Project."
      },
      {
        "num": "2",
        "item": "Support for multiple processor architectures",
        "reason": "The project is restricted to keep implementation and testing manageable."
      },
      {
        "num": "3",
        "item": "Graphical desktop environment, networking stack and broad peripheral support",
        "reason": "These features add substantial complexity and are not required to demonstrate the selected kernel fundamentals."
      }
    ],
    "feasibilityTable": [
      {
        "aspect": "Technical Feasibility",
        "assessment": "The x86-64 architecture, C programming, assembly language, and an existing bootloader provide a suitable foundation for developing the mini-kernel."
      },
      {
        "aspect": "Software Resource Feasibility",
        "assessment": "Required open-source tools such as GCC, NASM, Make, Git, and QEMU are available for kernel development and testing."
      },
      {
        "aspect": "Hardware Feasibility",
        "assessment": "A standard x86-64 laptop with WSL Ubuntu is sufficient to develop and test the kernel using QEMU emulation."
      },
      {
        "aspect": "Knowledge Feasibility",
        "assessment": "Concepts from Operating Systems, Computer Organization and Architecture, C programming, and Data Structures support the development process."
      },
      {
        "aspect": "Time and Team Feasibility",
        "assessment": "The project can be developed incrementally by dividing tasks among four team members and focusing on the selected Process, Memory, and File Management functionalities."
      },
      {
        "aspect": "Major Constraints & Limitations",
        "assessment": "Time limitation within academic duration; hardware testing restricted to QEMU emulation; low-level technical complexity of CPU/memory interfaces; kernel debugging challenges; focused bounded scope rather than a commercial operating system."
      }
    ]
  },
  "stage1": {
    "frTable": [
      {
        "id": "FR-01",
        "desc": "Boot and initialize the educational mini-kernel in a controlled emulated environment and make kernel output available.",
        "priority": "Mandatory",
        "sourceNeed": "S0-N2"
      },
      {
        "id": "FR-02",
        "desc": "Create, initialize, track and terminate bounded kernel processes using process identity and lifecycle states.",
        "priority": "Mandatory",
        "sourceNeed": "S0-N2"
      },
      {
        "id": "FR-03",
        "desc": "Allocate and release fixed-size memory pages while maintaining page-availability state.",
        "priority": "Mandatory",
        "sourceNeed": "S0-N2"
      },
      {
        "id": "FR-04",
        "desc": "Select an eligible process and perform a CPU context transfer between process contexts.",
        "priority": "Mandatory",
        "sourceNeed": "S0-N2"
      },
      {
        "id": "FR-05",
        "desc": "Create, open, read, write, close and remove files using bounded kernel file facilities.",
        "priority": "Mandatory",
        "sourceNeed": "S0-N2"
      },
      {
        "id": "FR-06",
        "desc": "Associate file resources with processes through process identity and file descriptors.",
        "priority": "Mandatory",
        "sourceNeed": "S0-N2"
      },
      {
        "id": "FR-07",
        "desc": "Dispatch supported process, memory and file service requests through the kernel-service interface.",
        "priority": "Mandatory",
        "sourceNeed": "S0-N2"
      },
      {
        "id": "FR-08",
        "desc": "Record selected process, memory, file and service events with information needed to inspect resource-state changes.",
        "priority": "Mandatory",
        "sourceNeed": "S0-N3"
      },
      {
        "id": "FR-09",
        "desc": "Measure selected execution/resource operations and make performance evidence available for analysis.",
        "priority": "Mandatory",
        "sourceNeed": "S0-N4"
      },
      {
        "id": "FR-10",
        "desc": "Demonstrate and validate an integrated Process–Memory–File interaction within the kernel.",
        "priority": "Mandatory",
        "sourceNeed": "S0-N5"
      }
    ],
    "nfrTable": [
      {
        "id": "NFR-01",
        "desc": "Invalid or unsafe page requests shall be rejected without corrupting allocator state.",
        "cat": "Reliability",
        "target": "No invalid/double-free test may alter valid allocation state."
      },
      {
        "id": "NFR-02",
        "desc": "The kernel shall execute process, memory and file management operations within specified CPU cycle limits.",
        "cat": "Performance",
        "target": "Each supported operation shall complete within its experimentally established CPU cycle threshold under identical QEMU test conditions."
      },
      {
        "id": "NFR-03",
        "desc": "Process, Memory and File responsibilities shall retain clear ownership boundaries.",
        "cat": "Modularity",
        "target": "Engines use defined interfaces and do not directly corrupt another engine's internal state."
      },
      {
        "id": "NFR-04",
        "desc": "Validation shall be reproducible in the documented emulated environment.",
        "cat": "Reproducibility",
        "target": "Documented build/run/test procedure reproduces the validation sequence."
      },
      {
        "id": "NFR-05",
        "desc": "Observation and performance outputs shall be understandable to learners.",
        "cat": "Educational usability",
        "target": "Each demonstration identifies operation, result and relevant state/event/measurement."
      },
      {
        "id": "NFR-06",
        "desc": "The Round Robin scheduler shall ensure fair CPU allocation among ready processes using a fixed time quantum.",
        "cat": "Scheduling Fairness",
        "target": "Every continuously ready process shall receive CPU time in cyclic order, with no process being indefinitely starved."
      }
    ],
    "userStoryTable": [
      {
        "id": "UC-01",
        "actor": "Learner / User",
        "desc": "Start the mini-kernel in the controlled environment.",
        "mainFlow": "Start kernel → initialize required resources → kernel becomes ready → display startup status.",
        "exceptionFlow": "Kernel fails to initialize → display failure information → halt safely."
      },
      {
        "id": "UC-02",
        "actor": "Learner / User",
        "desc": "Create a process for an executable workload.",
        "mainFlow": "Submit workload → create process → assign process identity → set initial execution state → process becomes ready.",
        "exceptionFlow": "Invalid workload or process-creation failure → report failure → do not create an invalid process."
      },
      {
        "id": "UC-03",
        "actor": "Learner / User",
        "desc": "Observe and manage the execution state of an active process.",
        "mainFlow": "Process enters a state → state changes during execution → current state is maintained → state change is recorded.",
        "exceptionFlow": "Invalid state transition → reject transition → retain valid process state."
      },
      {
        "id": "UC-04",
        "actor": "Learner / User",
        "desc": "Terminate a process and release its associated resources.",
        "mainFlow": "Process completes/termination requested → terminate process → release associated resources → record termination.",
        "exceptionFlow": "Termination/resource-release failure → report failure → preserve valid resource state."
      },
      {
        "id": "UC-05",
        "actor": "Learner / User",
        "desc": "Allocate memory for process execution.",
        "mainFlow": "Process requests memory → check available memory → allocate required memory → update memory state.",
        "exceptionFlow": "Insufficient memory → allocation fails → report memory-allocation failure without corrupting state."
      },
      {
        "id": "UC-06",
        "actor": "Learner / User",
        "desc": "Release memory associated with a terminated process.",
        "mainFlow": "Process terminates → identify allocated memory → release memory → update available-memory state.",
        "exceptionFlow": "Memory release inconsistency → report error → retain resource information for validation."
      },
      {
        "id": "UC-07",
        "actor": "Learner / User",
        "desc": "Perform basic file creation or opening.",
        "mainFlow": "Process requests file operation → create/open file → update file state → return operation result.",
        "exceptionFlow": "Invalid/unavailable file operation → return failure → maintain valid file state."
      },
      {
        "id": "UC-08",
        "actor": "Learner / User",
        "desc": "Perform basic file read/write operations.",
        "mainFlow": "Process requests read/write → perform operation → update relevant file state → return result.",
        "exceptionFlow": "Invalid operation or unavailable file → report failure → preserve valid file state."
      },
      {
        "id": "UC-09",
        "actor": "Learner / User",
        "desc": "Observe selected kernel events and resource-state changes during execution.",
        "mainFlow": "Kernel activity occurs → record selected event → capture relevant resource state → associate event and state → inspect event sequence and available evidence.",
        "exceptionFlow": "Event/state information unavailable or inconsistent → record incomplete observation → identify observation gap → continue without corrupting kernel state."
      },
      {
        "id": "UC-10",
        "actor": "Learner / User",
        "desc": "Measure performance of a controlled workload and repeat it for validation.",
        "mainFlow": "Run workload → collect defined performance metrics → record measurements → repeat same workload under same conditions → compare results.",
        "exceptionFlow": "Measurement unavailable, inconsistent, or varies beyond defined conditions → mark measurement invalid → repeat controlled validation run."
      }
    ],
    "useCaseImage": "assets/team14_use_case_diagram.png",
    "useCaseCaption": "Fig 2. System Use Case Diagram",
    "acceptanceTable": [
      {
        "req": "FR-01",
        "criteria": "Kernel starts successfully in the controlled environment and reaches the required startup stage.",
        "method": "Kernel startup test"
      },
      {
        "req": "FR-02",
        "criteria": "A process is created with a valid identity and state, and can be terminated correctly.",
        "method": "Process lifecycle test"
      },
      {
        "req": "FR-03",
        "criteria": "Memory pages can be allocated and released while maintaining correct memory state.",
        "method": "Memory allocation/release test"
      },
      {
        "req": "FR-04",
        "criteria": "A READY process is selected and its context is switched correctly.",
        "method": "Scheduler/context-switch test"
      },
      {
        "req": "FR-05",
        "criteria": "Files can be created, opened, read, written, closed and removed correctly.",
        "method": "File operation test"
      },
      {
        "req": "FR-06",
        "criteria": "A valid PID/FD identifies the intended file resource.",
        "method": "Process-file integration test"
      },
      {
        "req": "FR-07",
        "criteria": "Supported service requests reach the correct subsystem and unsupported requests are rejected.",
        "method": "Service dispatch test"
      },
      {
        "req": "FR-08",
        "criteria": "Selected process, memory and file operations generate the required event records.",
        "method": "Event recording test"
      },
      {
        "req": "FR-09",
        "criteria": "Selected operations produce measurable performance results using the defined measurement method.",
        "method": "Performance measurement test"
      },
      {
        "req": "FR-10",
        "criteria": "At least one Process–Memory–File interaction completes successfully and its result/events can be observed.",
        "method": "Integrated validation test"
      },
      {
        "req": "NFR-01",
        "criteria": "Invalid or unsafe memory requests are rejected without changing valid memory state.",
        "method": "Invalid allocation/free test"
      },
      {
        "req": "NFR-02",
        "criteria": "When a resource limit is reached, the system reports failure without overwriting valid entries.",
        "method": "Resource exhaustion test"
      },
      {
        "req": "NFR-03",
        "criteria": "Recorded events contain the required information consistently.",
        "method": "Event record inspection"
      },
      {
        "req": "NFR-04",
        "criteria": "Performance measurements are obtained using the same defined procedure and test conditions, producing comparable cycle-based evidence",
        "method": "Repeated performance measurements"
      },
      {
        "req": "NFR-05",
        "criteria": "Process, Memory and File components use their defined responsibilities without directly corrupting another component's state.",
        "method": "Interface/integration test"
      },
      {
        "req": "NFR-06",
        "criteria": "The documented build, run and test steps can be repeated in the controlled environment.",
        "method": "Repeat build/run/test"
      },
      {
        "req": "NFR-07",
        "criteria": "Demonstrations clearly show the operation, result and relevant event/state/measurement information.",
        "method": "Evidence inspection"
      }
    ]
  },
  "systemDesign": {}
};

window.STATIC_TEAMS_DATA['A-14'] = team14Data;
