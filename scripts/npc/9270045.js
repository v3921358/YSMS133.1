var status = 0;  

function start() { 
    status = -1; 
    action(1, 0, 0); 
} 

function action(mode, type, selection) { 
    if (mode == -1) { 
        cm.dispose(); 
    } else { 
        if (status >= 3 && mode == 0) { 
            cm.dispose(); 
            return; 
        } 
        if (mode == 1) 
            status++; 
        else { 
            cm.sendOk("�������ѡ���ǶԵ�.."); 
            cm.dispose(); 
            return; 
        } if (status == 0) { 
            cm.sendYesNo("�������˳���������?"); 
        } else if (status == 1) { 
	    cm.warp(910000000);
            cm.dispose(); 
        }         
    } 
}