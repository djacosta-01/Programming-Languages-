#include "exercises.h"
#include <valarray>
#include <map>
#include <list>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

double dot(valarray<double> a, valarray<double> b){
    return (a * b).sum();
}

vector<int> stretched_nonzeros(vector<int> v){
    vector<int> filtered;
    v.erase(remove(begin(v), end(v), 0), end(v));
    for (auto index = 1; index <= v.size(); index++) {
        for (auto repeat = 0; repeat < index; repeat++) {
            filtered.push_back(v[index - 1]);
        }
    }
    return filtered;
}

void powers(int base, int limit, function<void(int)> consumer){
    for (int power = 1; power <= limit; power *= base) {
        consumer(power);
    }
}

int IntStack::size(){
    
}

void IntStack::push(int item){
    Node newValue {item, nullptr};
    newValue.next = top;
    top = newValue;
}

int IntStack::pop(){
    // Or unique_ptr?????
    shared_ptr<Node> poppedValue(new Node);

}

string Sayer::operator()() {
    return words;
}
Sayer Sayer::operator()(string word){
    if (words == ""){
        return Sayer{words + word};
    }
    return Sayer{ words + " " + word };
}
Sayer say;

vector<pair<string, int>> sorted_word_counts(list<string> words){
    map<string, int> word_count;
    vector<pair<string, int>> word_pairs;
    for (string word : words) {
        word_count[word]++;
    }
    for (auto pair : word_count) {
        word_pairs.push_back(make_pair(pair.first, pair.second));
    }
    sort(word_pairs.begin(), word_pairs.end(), [](auto first_pair, auto second_pair) { 
        return first_pair.second > second_pair.second; 
        });
    return word_pairs;
}