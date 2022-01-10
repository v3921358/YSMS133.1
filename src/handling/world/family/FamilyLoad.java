package handling.world.family;

import handling.world.WorldFamilyService;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.atomic.AtomicInteger;

import org.apache.log4j.Logger;

public class FamilyLoad {

    public static final int NumSavingThreads = 8;
    private static final TimingThread[] Threads = new TimingThread[NumSavingThreads];
    private static final Logger log = Logger.getLogger(FamilyLoad.class);

    static {
        for (int i = 0; i < Threads.length; i++) {
            Threads[i] = new TimingThread(new FamilyLoadRunnable());
        }
    }

    private static final AtomicInteger Distribute = new AtomicInteger(0);

    public static void QueueFamilyForLoad(int hm) {
        int Current = Distribute.getAndIncrement() % NumSavingThreads;
        Threads[Current].getRunnable().Queue(hm);
    }

    public static void Execute(Object ToNotify) {
        for (int i = 0; i < Threads.length; i++) {
            Threads[i].getRunnable().SetToNotify(ToNotify);
        }
        for (int i = 0; i < Threads.length; i++) {
            Threads[i].start();
        }
    }

    private static class FamilyLoadRunnable implements Runnable {

        private Object ToNotify;
        private ArrayBlockingQueue<Integer> Queue = new ArrayBlockingQueue<>(1000);

        @Override
        public void run() {
            try {
                while (!Queue.isEmpty()) {
                    WorldFamilyService.getInstance().addLoadedFamily(new MapleFamily(Queue.take()));
                }
                synchronized (ToNotify) {
                    ToNotify.notify();
                }
            } catch (InterruptedException ex) {
                log.error("[FamilyLoad] 加载学院信息出错." + ex);
            }
        }

        private void Queue(Integer hm) {
            Queue.add(hm);
        }

        private void SetToNotify(Object o) {
            if (ToNotify == null) {
                ToNotify = o;
            }
        }
    }

    private static class TimingThread extends Thread {

        private final FamilyLoadRunnable ext;

        public TimingThread(FamilyLoadRunnable r) {
            super(r);
            ext = r;
        }

        public FamilyLoadRunnable getRunnable() {
            return ext;
        }
    }
}
