ALL_WORDS = []
MAX_LEN = 10
ALPHABET = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

def strip_line(line):
    line = line.lower()
    newline = ""
    for char in line:
        if char in ALPHABET:
            newline += char
    return newline

def read_words(filename):
    f = open(filename, "r")
    for line in f:
        ALL_WORDS.append(strip_line(line))
    f.close()

def find_n_gram(n):
    # Initialize dictionary of all possible n-grams of given n
    grams = [l for l in ALPHABET]
    
    for k in range(n-1):
        currLen = len(grams)
        for i in range(currLen):
            for j in range(26):
                grams.append((grams[i] + ALPHABET[j]))
        if k < n-1:
            for _ in range(currLen):
                grams.pop(0)

    gramdic = {}
    for gram in grams:
        gramdic[gram] = 0

    # Go through each word in ALL_WORDS and count the n-grams
    for WORD in ALL_WORDS:
        i = 0
        while (i+n <= len(WORD)):
            ngram = WORD[i:i+n]

            #TESTING
            # if ngram == "e":
            #     print("e found in word " + WORD + " at position " + str(i))

            gramdic[ngram] += 1
            i += 1

    return gramdic


def print_results(dic, n):
    # Format: numLetters (n), gram, number of occurrences, total occurences for that n, ranking among that n
    total_occurences = sum(dic.values())
    sorted_vals = sorted(list(set(dic.values())), reverse=True)
    
    sorteddic = {}
    for val in sorted_vals:
        for gram in dic.keys():
            if dic[gram] == val:
                sorteddic[gram] = val

    better = 1
    rankings = {}
    for val in sorted_vals:
        rankings[val] = better
        better += list(dic.values()).count(val)

    for gram in sorteddic.keys():
        result = "[" + str(n) + ",'" + gram + "'," + str(sorteddic[gram]) + "," + str(total_occurences) + "," + str(rankings[sorteddic[gram]]) + "],\n"
        with open("freqs.js", "a") as file:
            file.write(result)

def main():
    read_words("commonwords.txt")
    ngrams = [[] for _ in range(11)]
    ngrams[1] = find_n_gram(1)
    ngrams[2] = find_n_gram(2)
    ngrams[3] = find_n_gram(3)

    # ngrams[4] = find_n_gram(4)
    # ngrams[5] = find_n_gram(5)
    # ngrams[6] = find_n_gram(6)
    # ngrams[7] = find_n_gram(7)
    # ngrams[8] = find_n_gram(8)
    # ngrams[9] = find_n_gram(9)
    # ngrams[10] = find_n_gram(10)

    for i in range(1, 4):
        print_results(ngrams[i], i)

main()