import { ScriptStep, FileNode } from './types';
import { Terminal, FolderOpen, Search, ShieldAlert, Activity, FileText, CheckCircle } from 'lucide-react';

export const SCRIPT_CONTENT = `#!/bin/bash

# --- 變數初始化 ---
TARGET_IP="$1"
SCAN_DIR="./nmapscan"
LOG_FILE="./scan_log_$(date +%Y%m%d_%H%M%S).txt"

# --- 結構化內容輸出函式 ---
function log_message {
    local type="$1"
    local message="$2"
    
    # Log: 寫入完整且帶有時間戳記的記錄到日誌檔
    echo "$(date +%Y-%m-%d\\ %H:%M:%S) [$type] $message" >> "$LOG_FILE"
    
    # Terminal: 輸出簡潔版 (不含時間戳記) 到終端機
    echo "[$type] $message"
}

# --- 參數檢查 ---
if [ -z "$TARGET_IP" ]; then
    log_message "錯誤" "請提供目標 IP 地址。使用方法: $0 <目標IP>"
    exit 1
fi

# --- 步驟 1: 建立工作目錄 ---
log_message "步驟 1" "檢查並建立目標工作目錄：$SCAN_DIR"
mkdir -p "$SCAN_DIR" 2>/dev/null
log_message "成功" "輸出目錄設定為 $SCAN_DIR"
echo "---"

# --- 步驟 2: TCP 全埠快速掃描 ---
log_message "步驟 2" "執行 TCP 全埠快速掃描 (-p- -sT --min-rate 10000)..."
TCP_PORTS_FILE="$SCAN_DIR/ports"
sudo nmap -sT --min-rate 10000 -p- "$TARGET_IP" -oA "$TCP_PORTS_FILE" 2>&1 | tee -a "$LOG_FILE"
echo "---"

if [ ! -f "$TCP_PORTS_FILE.nmap" ]; then
    log_message "錯誤" "全埠掃描失敗，請檢查權限或連線。退出。"
    exit 1
fi

# --- 步驟 3: 提取開放 Ports ---
log_message "步驟 3" "提取開放的 TCP ports..."
OPEN_PORTS=$(grep 'open' "$TCP_PORTS_FILE.nmap" | cut -d'/' -f1 | tr '\\n' ',' | sed 's/,$//')

if [ -z "$OPEN_PORTS" ]; then
    log_message "警告" "未發現任何開放的 TCP ports。跳過詳細掃描。"
else
    log_message "成功" "已發現開放 TCP Ports: $OPEN_PORTS"
    echo "---"

    # --- 步驟 4: 詳細服務與 OS 識別 ---
    log_message "步驟 4" "執行 TCP 詳細服務版本 (-sVC) 與 OS 識別 (-O)..."
    sudo nmap -sT -sVC -O -p"$OPEN_PORTS" "$TARGET_IP" -oA "$SCAN_DIR/details" 2>&1 | tee -a "$LOG_FILE"
    log_message "成功" "詳細掃描結果已儲存至 $SCAN_DIR/details.*"
    echo "---"

    # --- 步驟 5: 弱點 Script 掃描 ---
    log_message "步驟 5" "執行 Nmap 內建弱點 Script (--script=vuln)..."
    sudo nmap --script=vuln -p"$OPEN_PORTS" "$TARGET_IP" -oA "$SCAN_DIR/vul" 2>&1 | tee -a "$LOG_FILE"
    log_message "成功" "弱點 Script 掃描結果已儲存至 $SCAN_DIR/vul.*"
    echo "---"
fi

# --- 步驟 6: UDP 服務掃描 ---
log_message "步驟 6" "執行 UDP Top 20 服務掃描 (-sU --top-ports 20)..."
sudo nmap -sU --top-ports 20 "$TARGET_IP" -oA "$SCAN_DIR/udp" 2>&1 | tee -a "$LOG_FILE"
log_message "成功" "UDP 掃描結果已儲存至 $SCAN_DIR/udp.*"
echo "---"

# --- 步驟 7: 總結 ---
log_message "完成" "所有 Nmap 掃描任務已完成！"
log_message "報告查閱" "所有結果檔案儲存於 ./nmapscan"`;

export const PROCESS_STEPS: ScriptStep[] = [
  {
    id: 1,
    title: "Initialization",
    command: "mkdir -p ./nmapscan",
    description: "Sets up the isolated environment. Creates a directory to keep all scan artifacts organized and checks for the target IP argument.",
    icon: 'folder',
    color: 'blue'
  },
  {
    id: 2,
    title: "TCP Discovery",
    command: "nmap -sT --min-rate 10000 -p-",
    description: "High-speed full port scan. We intentionally use --min-rate 10000 to force Nmap to send packets faster, drastically reducing scan time for 65k ports.",
    icon: 'activity',
    color: 'purple'
  },
  {
    id: 3,
    title: "Port Extraction",
    command: "grep | cut | tr",
    description: "Data parsing pipeline. Extracts only the 'open' ports from the initial scan to create a comma-separated list (e.g., 22,80,443) for the next stage.",
    icon: 'search',
    color: 'amber'
  },
  {
    id: 4,
    title: "Deep Dive",
    command: "nmap -sVC -O -p$OPEN_PORTS",
    description: "Targeted analysis. Queries *only* the active ports for Version Info (-sV), Default Scripts (-sC), and OS Fingerprinting (-O) to maximize efficiency.",
    icon: 'terminal',
    color: 'emerald'
  },
  {
    id: 5,
    title: "Vuln Scan",
    command: "nmap --script=vuln ...",
    description: "Automated vulnerability assessment. Runs the NSE 'vuln' category against identified services to flag potential CVEs immediately.",
    icon: 'shield',
    color: 'rose'
  },
  {
    id: 6,
    title: "UDP Sampling",
    command: "nmap -sU --top-ports 20",
    description: "Checks the top 20 most common UDP services (DNS, SNMP, etc.). UDP scanning is slow, so we limit it to high-value targets only.",
    icon: 'activity',
    color: 'blue'
  },
  {
    id: 7,
    title: "Reporting",
    command: "tee -a scan_log.txt",
    description: "Finalizes the mission. Ensures all data is saved in standard formats (XML, Grepable, Nmap) and a human-readable log is complete.",
    icon: 'file-text',
    color: 'emerald'
  }
];

export const EXECUTION_STEPS = [
  { step: "01", title: "Save", cmd: "vim nmap_auto_scan.sh", desc: "Save code to file" },
  { step: "02", title: "Permission", cmd: "chmod +x nmap_auto_scan.sh", desc: "Make executable" },
  { step: "03", title: "Execute", cmd: "sudo ./nmap_auto_scan.sh <IP>", desc: "Run as root" },
  { step: "04", title: "Verify", cmd: "ls -R nmapscan/", desc: "Check results" },
];

export const OUTPUT_TREE: FileNode = {
  name: "current_directory/",
  type: "folder",
  children: [
    {
      name: "scan_log_TIMESTAMP.txt",
      type: "file",
      description: "Full execution log"
    },
    {
      name: "nmapscan/",
      type: "folder",
      children: [
        { name: "ports.nmap", type: "file", description: "Phase 1: Raw open ports" },
        { name: "details.nmap", type: "file", description: "Phase 2: Service versions & OS" },
        { name: "vul.nmap", type: "file", description: "Phase 3: Vulnerability findings" },
        { name: "udp.nmap", type: "file", description: "Phase 4: UDP services" },
        { name: "*.xml", type: "file", description: "Machine readable formats" }
      ]
    }
  ]
};

export const STEP_ICONS: Record<string, any> = {
  folder: FolderOpen,
  terminal: Terminal,
  search: Search,
  shield: ShieldAlert,
  activity: Activity,
  'file-text': FileText,
  check: CheckCircle
};