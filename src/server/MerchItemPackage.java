package server;

import client.inventory.Item;

import java.util.ArrayList;
import java.util.List;

public class MerchItemPackage {

    private long sentTime;
    private long mesos = 0;
    private List<Item> items = new ArrayList<>();

    public void setItems(List<Item> items) {
        this.items = items;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setSentTime(long sentTime) {
        this.sentTime = sentTime;
    }

    public long getSentTime() {
        return sentTime;
    }

    public long getMesos() {
        return mesos;
    }

    public void setMesos(long set) {
        mesos = set;
    }
}
