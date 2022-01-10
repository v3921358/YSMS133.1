package tools;

import java.util.StringTokenizer;

/**
 * Provides a suite of utilities for manipulating strings.
 *
 * @author Frz
 * @version 1.0
 * @since Revision 336
 */
public class StringUtil {

    /**
     * Gets a string padded from the left to <code>length</code> by
     * <code>padchar</code>.
     *
     * @param in The input string to be padded.
     * @param padchar The character to pad with.
     * @param length The length to pad to.
     * @return The padded string.
     */
    public static String getLeftPaddedStr(String in, char padchar, int length) { //左
        StringBuilder builder = new StringBuilder(length);
        for (int x = in.getBytes().length; x < length; x++) {
            builder.append(padchar);
        }
        builder.append(in);
        return builder.toString();
    }

    /**
     * Gets a string padded from the right to <code>length</code> by
     * <code>padchar</code>.
     *
     * @param in The input string to be padded.
     * @param padchar The character to pad with.
     * @param length The length to pad to.
     * @return The padded string.
     */
    public static String getRightPaddedStr(int in, char padchar, int length) { //右
        return getRightPaddedStr(String.valueOf(in), padchar, length);
    }

    public static String getRightPaddedStr(long in, char padchar, int length) { //右
        return getRightPaddedStr(String.valueOf(in), padchar, length);
    }

    public static String getRightPaddedStr(String in, char padchar, int length) { //右
        StringBuilder builder = new StringBuilder(in);
        for (int x = in.getBytes().length; x < length; x++) {
            builder.append(padchar);
        }
        return builder.toString();
    }

    /**
     * Joins an array of strings starting from string <code>start</code> with a
     * space.
     *
     * @param arr The array of strings to join.
     * @param start Starting from which string.
     * @return The joined strings.
     */
    public static String joinStringFrom(String arr[], int start) {
        return joinStringFrom(arr, start, " ");
    }

    /**
     * Joins an array of strings starting from string <code>start</code> with
     * <code>sep</code> as a seperator.
     *
     * @param arr The array of strings to join.
     * @param start Starting from which string.
     * @return The joined strings.
     */
    public static String joinStringFrom(String arr[], int start, String sep) {
        StringBuilder builder = new StringBuilder();
        for (int i = start; i < arr.length; i++) {
            builder.append(arr[i]);
            if (i != arr.length - 1) {
                builder.append(sep);
            }
        }
        return builder.toString();
    }

    /**
     * Makes an enum name human readable (fixes spaces, capitalization, etc)
     *
     * @param enumName The name of the enum to neaten up.
     * @return The human-readable enum name.
     */
    public static String makeEnumHumanReadable(String enumName) {
        StringBuilder builder = new StringBuilder(enumName.length() + 1);
        for (String word : enumName.split("_")) {
            if (word.length() <= 2) {
                builder.append(word); // assume that it's an abbrevation
            } else {
                builder.append(word.charAt(0));
                builder.append(word.substring(1).toLowerCase());
            }
            builder.append(' ');
        }
        return builder.substring(0, enumName.length());
    }

    /**
     * Counts the number of <code>chr</code>'s in <code>str</code>.
     *
     * @param str The string to check for instances of <code>chr</code>.
     * @param chr The character to check for.
     * @return The number of times <code>chr</code> occurs in <code>str</code>.
     */
    public static int countCharacters(String str, char chr) {
        int ret = 0;
        for (int i = 0; i < str.length(); i++) {
            if (str.charAt(i) == chr) {
                ret++;
            }
        }
        return ret;
    }

    public static String getReadableMillis(long startMillis, long endMillis) {
        StringBuilder sb = new StringBuilder();
        double elapsedSeconds = (endMillis - startMillis) / 1000.0;
        int elapsedSecs = ((int) elapsedSeconds) % 60;
        int elapsedMinutes = (int) (elapsedSeconds / 60.0);
        int elapsedMins = elapsedMinutes % 60;
        int elapsedHrs = elapsedMinutes / 60;
        int elapsedHours = elapsedHrs % 24;
        int elapsedDays = elapsedHrs / 24;
        if (elapsedDays > 0) {
            boolean mins = elapsedHours > 0;
            sb.append(getLeftPaddedStr(String.valueOf(elapsedDays), '0', 2));
            sb.append("天");
            if (mins) {
                boolean secs = elapsedMins > 0;
                sb.append(getLeftPaddedStr(String.valueOf(elapsedHours), '0', 2));
                sb.append("时");
                if (secs) {
                    boolean millis = elapsedSecs > 0;
                    sb.append(getLeftPaddedStr(String.valueOf(elapsedMins), '0', 2));
                    sb.append("分");
                    if (millis) {
                        sb.append(getLeftPaddedStr(String.valueOf(elapsedSecs), '0', 2));
                        sb.append("秒");
                    }
                }
            }
        } else if (elapsedHours > 0) {
            boolean mins = elapsedMins > 0;
            sb.append(getLeftPaddedStr(String.valueOf(elapsedHours), '0', 2));
            sb.append("时");
            if (mins) {
                boolean secs = elapsedSecs > 0;
                sb.append(getLeftPaddedStr(String.valueOf(elapsedMins), '0', 2));
                sb.append("分");
                if (secs) {
                    sb.append(getLeftPaddedStr(String.valueOf(elapsedSecs), '0', 2));
                    sb.append("秒");
                }
            }
        } else if (elapsedMinutes > 0) {
            boolean secs = elapsedSecs > 0;
            sb.append(getLeftPaddedStr(String.valueOf(elapsedMins), '0', 2));
            sb.append("分");
            if (secs) {
                sb.append(getLeftPaddedStr(String.valueOf(elapsedSecs), '0', 2));
                sb.append("秒");
            }
        } else if (elapsedSeconds > 0) {
            sb.append(getLeftPaddedStr(String.valueOf(elapsedSecs), '0', 2));
            sb.append("秒");
        } else {
            sb.append("None.");
        }
        return sb.toString();
    }

    public static final int[] StringtoInt(final String str, final String separator) {
        final StringTokenizer strTokens = new StringTokenizer(str, separator);
        int[] strArray = new int[strTokens.countTokens()];
        int i = 0;
        while (strTokens.hasMoreTokens()) {
            strArray[i] = Integer.parseInt(strTokens.nextToken().trim());
            i++;
        }
        return strArray;
    }

    public static final boolean[] StringtoBoolean(final String str, final String separator) {
        final StringTokenizer strTokens = new StringTokenizer(str, separator);
        boolean[] strArray = new boolean[strTokens.countTokens()];
        int i = 0;
        while (strTokens.hasMoreTokens()) {
            strArray[i] = Boolean.parseBoolean(strTokens.nextToken().trim());
            i++;
        }
        return strArray;
    }
}
